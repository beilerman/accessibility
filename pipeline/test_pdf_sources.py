"""PDF passages must be real extracted text; byte monitoring works without a parser."""
import io
import sys
import unittest
from unittest.mock import patch

from pypdf import PdfWriter
from pypdf.generic import DecodedStreamObject, DictionaryObject, NameObject

from check_sources import compare, judge_by_quotes, response_result


URL = "https://venue.example/facility-guide.pdf"
QUOTE = "Staff demonstrate equipment but do not lift people."


def pdf(text=QUOTE, title="Guide", encrypted=False):
    writer = PdfWriter()
    page = writer.add_blank_page(width=612, height=792)
    if text:
        font = DictionaryObject({NameObject("/Type"): NameObject("/Font"),
                                 NameObject("/Subtype"): NameObject("/Type1"),
                                 NameObject("/BaseFont"): NameObject("/Helvetica")})
        page[NameObject("/Resources")] = DictionaryObject({
            NameObject("/Font"): DictionaryObject({NameObject("/F1"): writer._add_object(font)})})
        stream = DecodedStreamObject()
        stream.set_data(f"BT /F1 12 Tf 40 700 Td ({text}) Tj ET".encode())
        page[NameObject("/Contents")] = writer._add_object(stream)
    writer.add_metadata({"/Title": title})
    if encrypted:
        writer.encrypt("private")
    output = io.BytesIO()
    writer.write(output)
    return output.getvalue()


def result(data, content_type="application/pdf"):
    return response_result(data, content_type, 200, URL)


class PdfSourceTests(unittest.TestCase):
    def judge(self, before, after):
        findings = compare({URL: before}, {URL: after})
        missing = judge_by_quotes(
            [{"facts": [{"id": "venue.mobility.1", "source_url": URL, "review_status": "source_checked"}]}],
            {"venue.mobility.1": {"url": URL, "quote": QUOTE}}, {URL: after}, findings)
        return findings, missing

    def test_text_and_magic_detection_for_extensionless_pdf(self):
        fetched = result(pdf(), "application/octet-stream")
        self.assertEqual(fetched["_text"], QUOTE)
        self.assertEqual(fetched["pages"], 1)
        self.assertEqual(fetched["format"], "pdf")

    def test_metadata_change_keeps_supported_passage(self):
        findings, missing = self.judge(result(pdf()), result(pdf(title="Updated guide")))
        self.assertEqual(findings, {URL: "supported"})
        self.assertEqual(missing, {})

    def test_removed_assistance_limit_identifies_affected_note(self):
        findings, missing = self.judge(result(pdf()), result(pdf("Ask the front desk.")))
        self.assertEqual(findings, {URL: "quote_missing"})
        self.assertEqual(missing, {URL: ["venue.mobility.1"]})

    def test_no_parser_preserves_byte_hash_and_requires_whole_document_review(self):
        data = pdf(title="Changed")
        with patch.dict(sys.modules, {"pypdf": None}):
            fetched = result(data)
        self.assertNotIn("_text", fetched)
        self.assertIn("text_extraction_error", fetched)
        self.assertEqual(fetched["sha256"], result(data)["sha256"])
        self.assertEqual(self.judge(result(pdf()), fetched), ({URL: "changed"}, {}))

    def test_empty_encrypted_or_invalid_documents_never_supply_quotes(self):
        for data in (pdf(text=""), pdf(encrypted=True), b"%PDF-broken"):
            with self.subTest(data=data[:20]):
                fetched = result(data)
                self.assertNotIn("_text", fetched)
                self.assertIn("text_extraction_error", fetched)

    def test_size_and_page_limits_leave_documents_for_manual_review(self):
        with patch("check_sources.MAX_PDF_BYTES", 10):
            self.assertIsNone(result(pdf())["status"])
        with patch("check_sources.MAX_PDF_PAGES", 0):
            fetched = result(pdf())
        self.assertNotIn("_text", fetched)
        self.assertIn("150-page", fetched["text_extraction_error"])

    def test_html_fingerprints_and_quotes_are_unchanged(self):
        fetched = result(b"<p>Ramp at north door</p>", "text/html")
        self.assertEqual(fetched["_text"], " Ramp at north door ")
        self.assertEqual(fetched["fingerprint_version"], 6)


if __name__ == "__main__":
    unittest.main()
