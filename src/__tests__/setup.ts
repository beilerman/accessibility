import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)
afterEach(() => cleanup())
