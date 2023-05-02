import * as React from 'react'
import { render, cleanup, screen } from '@testing-library/react'

import { PhoneInput } from '../src/components/PhoneInput'

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup() // Resets the DOM after each test suite
})

describe('Phone input', () => {
  it('should render the phone input component', () => {
    render(<PhoneInput value={0} onchange={(n: string) => console.log(n)} />)
  })
})
