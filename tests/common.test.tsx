import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

import { PhoneInput } from '../src/components/PhoneInput'

afterEach(() => {
  cleanup()
})

describe('Phone input', () => {
  it('should render the phone input component', () => {
    render(<PhoneInput value={0} onchange={(n: string) => console.log(n)} />)
  })
})
