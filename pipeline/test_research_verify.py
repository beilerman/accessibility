"""Evidence gates must reject unavailable sources and incomplete evidence."""
import contextlib
import io
import json
from pathlib import Path
import runpy
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'pipeline'))
import check_sources
sys.path.insert(0, str(ROOT / 'scripts/research'))
import _catalog


class QuoteGateTests(unittest.TestCase):
    def run_gate(self, quote, response=None, empty=False):
        script = ROOT / 'scripts/research/verify.py'
        response = response if response is not None else {
            'status': 200, '_text': 'The entrance has stairs. Parking is free.',
            'final_url': 'https://example.invalid/fixture', 'sha256': 'source-hash'}
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / 'claims.json'
            source.write_text(json.dumps([] if empty else [{'slug': 'fixture', 'facts': [
                {'url': 'https://example.invalid/fixture', 'quote': quote}]}]))
            with patch.object(sys, 'argv', [str(script), str(source)]), \
                 patch.object(check_sources, 'fetch', return_value=response), \
                 contextlib.redirect_stdout(io.StringIO()):
                with self.assertRaises(SystemExit) as stopped:
                    runpy.run_path(str(script), run_name='__main__')
            saved = json.loads(source.with_name('claims.verified.json').read_text())
            return stopped.exception.code, saved[0]['facts'][0]['verified'] if saved else None

    def test_missing_passage_fails_command(self):
        self.assertEqual(self.run_gate('There is a ramp.'), (1, False))

    def test_empty_passage_and_empty_batch_fail(self):
        for quote in ('', '   ', None, [], ['The entrance has stairs.', '']):
            self.assertEqual(self.run_gate(quote), (1, False))
        self.assertEqual(self.run_gate('', empty=True), (1, None))

    def test_matching_passages_succeed_but_each_must_remain(self):
        self.assertEqual(self.run_gate('The entrance has stairs.'), (0, True))
        self.assertEqual(self.run_gate(['The entrance has stairs.', 'Parking is free.']), (0, True))
        self.assertEqual(self.run_gate(['The entrance has stairs.', 'There is a ramp.']), (1, False))

    def test_error_body_and_unextractable_pdf_cannot_verify(self):
        for response in ({'status': 404, '_text': 'The entrance has stairs.'},
                         {'status': 403, '_text': 'The entrance has stairs.'},
                         {'status': 200, 'text_extraction_error': 'PDF is encrypted'},
                         {'status': None, 'error': 'TLS failed'},
                         {'status': 200, '_text': 'The entrance has stairs.',
                          'final_url': 'http://example.invalid/fixture'}):
            self.assertEqual(self.run_gate('The entrance has stairs.', response), (1, False))


class ImportEvidenceTests(unittest.TestCase):
    def record(self, evidence, response=None):
        quotes = {}
        with patch.object(_catalog, 'source_result', return_value=response or {
                'status': 200, '_text': 'A ramp is at the north door. Parking is free.',
                'final_url': 'https://example.org/access', 'sha256': 'page-hash'}):
            _catalog.record_quote(quotes, 'venue.mobility.1', 'https://example.org/access',
                                  evidence, '2026-11-12', 'The north door has a ramp; parking is free.')
        return quotes['venue.mobility.1']

    def test_recheck_and_add_cannot_record_blank_or_unsupported_passages(self):
        for evidence in (None, '', [], ['A ramp is at the north door.', ''],
                         'An elevator reaches all floors.'):
            with self.assertRaises(ValueError):
                self.record(evidence)
        with self.assertRaises(ValueError):
            self.record('A ramp is at the north door.', {'status': 403, '_text': 'A ramp is at the north door.'})

    def test_record_binds_all_passages_to_note_text_and_source(self):
        result = self.record(['A ramp is at the north door.', 'Parking is free.'])
        self.assertEqual(result['additional_quotes'], ['Parking is free.'])
        self.assertEqual(result['claim_sha256'], check_sources.claim_digest('The north door has a ramp; parking is free.'))
        self.assertEqual(result['source_sha256'], 'page-hash')

    def test_recheck_failure_does_not_save_either_data_file(self):
        place = {'slug': 'venue', 'checked_at': '2026-11-08', 'facts': [
            {'id': 'venue.mobility.1', 'domain': 'mobility', 'text': 'A ramp.',
             'source_url': 'https://example.org/access', 'retrieved_at': '2026-11-08',
             'review_status': 'needs_recheck', 'history': []}]}
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / 'recheck.json'
            source.write_text(json.dumps({'venue.mobility.1': 'A ramp.'}))
            with patch.object(sys, 'argv', ['recheck.py', str(source), '2026-11-12']), \
                 patch.object(_catalog, 'load_places', return_value=[place]), \
                 patch.object(_catalog, 'load_quotes', return_value={}), \
                 patch.object(_catalog, 'source_result', return_value={'status': 404}), \
                 patch.object(_catalog, 'save_places') as save_places, \
                 patch.object(_catalog, 'save_quotes') as save_quotes:
                with self.assertRaises(ValueError):
                    runpy.run_path(str(ROOT / 'scripts/research/recheck.py'), run_name='__main__')
                save_places.assert_not_called()
                save_quotes.assert_not_called()
