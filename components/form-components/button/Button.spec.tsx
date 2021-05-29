import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import Button, { iButtonProps } from './Button'

const DEFAULT_PROPS: iButtonProps = {
  icon: <span>Test Icon</span>,
  type: 'button',
  variant: 'primary',
  disabled: false,
  onClick: () => {
    /** Do nothing */
  },
}

describe('Button', () => {
  afterEach(cleanup)

  test('renders correctly', () => {
    const { asFragment } = render(<Button {...DEFAULT_PROPS} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('sets button attributes (type) correctly', () => {
    const { getByRole } = render(<Button {...DEFAULT_PROPS} />)
    const button = getByRole('button')
    expect(button).toHaveAttribute('type', DEFAULT_PROPS.type)
  })

  test('renders icon', () => {
    const { getByText } = render(<Button {...DEFAULT_PROPS} />)
    const icon = getByText('Test Icon')
    expect(icon).toBeVisible()
  })

  test('disables button', () => {
    const { getByRole } = render(<Button {...DEFAULT_PROPS} disabled />)
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })

  test('calls on click when clicked', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(
      <Button {...DEFAULT_PROPS} onClick={onClickMock} />
    )
    const button = getByRole('button')
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalled()
  })
})
