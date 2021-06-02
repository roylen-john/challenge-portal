import React, { ReactElement } from 'react'
import { classNames } from '../../../utils/utils'

export interface iButtonProps {
  children?: React.ReactNode
  icon?: React.ReactNode
  type?: 'button' | 'submit'
  variant?: 'primary' | 'neutral' | 'danger'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Button = ({
  children,
  icon,
  type = 'button',
  variant = 'neutral',
  fullWidth,
  disabled,
  onClick,
}: iButtonProps): ReactElement => {
  return (
    <button
      className={classNames(
        variant === 'primary' && 'bg-primary hover:bg-primaryBold text-white',
        variant === 'neutral' &&
          'bg-neutral hover:bg-neutralBold text-gray-700',
        variant === 'danger' && 'bg-red-600 hover:bg-red-800 text-white',
        'relative font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:border-primaryBold disabled:bg-gray-200',
        fullWidth && 'w-full'
      )}
      type={type}
      disabled={disabled}
      role="button"
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
