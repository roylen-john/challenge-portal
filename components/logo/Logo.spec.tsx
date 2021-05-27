import React from 'react'
import { render } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Logo />)
    expect(asFragment()).toMatchSnapshot()
  })
})
