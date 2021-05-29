import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import TextField, { iTextFieldProps } from './TextField'

const DEFAULT_PROPS: iTextFieldProps = {
  name: 'test_input',
  type: 'text',
  label: 'Test Input',
  placeholder: 'Test Input',
  error: false,
  helperText: 'Test input helper text',
  value: '',
  onChange: () => {
    /** Do nothing */
  },
  onBlur: () => {
    /** Do nothing */
  },
}

describe('Textfield', () => {
  afterEach(cleanup)

  test('renders correctly', () => {
    const { asFragment } = render(<TextField {...DEFAULT_PROPS} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('sets input attributes (name, type) correctly', () => {
    const { getByRole } = render(<TextField {...DEFAULT_PROPS} />)
    const input = getByRole('textbox')
    expect(input).toHaveAttribute('name', DEFAULT_PROPS.name)
    expect(input).toHaveAttribute('type', DEFAULT_PROPS.type)
  })

  test('renders label and helper text correctly', () => {
    const { getByText } = render(<TextField {...DEFAULT_PROPS} />)
    const label = getByText(DEFAULT_PROPS.label)
    const helperText = getByText(DEFAULT_PROPS.helperText)
    expect(label).toBeVisible()
    expect(helperText).toBeVisible()
  })

  test('sets value correctly', () => {
    const { getByRole } = render(<TextField {...DEFAULT_PROPS} />)
    const input = getByRole('textbox')
    expect(input).toHaveValue(DEFAULT_PROPS.value)
  })

  test('should call onChange prop', () => {
    const onChangeMock = jest.fn()
    const { getByRole } = render(
      <TextField {...DEFAULT_PROPS} onChange={onChangeMock} />
    )
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test-value' } })
    expect(onChangeMock).toHaveBeenCalled()
  })

  test('should call onBlur prop', () => {
    const onBlurMock = jest.fn()
    const { getByRole } = render(
      <TextField {...DEFAULT_PROPS} onBlur={onBlurMock} />
    )
    const input = getByRole('textbox')
    fireEvent.blur(input)
    expect(onBlurMock).toHaveBeenCalled()
  })
})
