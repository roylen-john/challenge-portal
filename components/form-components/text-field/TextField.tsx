import React from 'react'
import { classNames } from '../../../utils/utils'

export interface iTextFieldProps {
  name: string
  type: 'text' | 'email' | 'number' | 'password'
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  value: string
  onChange: () => void
  onBlur: () => void
}

const TextField = React.forwardRef<HTMLInputElement, iTextFieldProps>(
  (
    {
      name,
      type,
      label,
      placeholder,
      error = false,
      helperText,
      fullWidth,
      value,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className={classNames(fullWidth && 'w-full')}>
        {label && (
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <input
          className={classNames(
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            error ? 'border-red-500' : ''
          )}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          role="textbox"
        />
        {helperText && (
          <p
            className={classNames(
              'text-xs italic mt-3',
              error ? 'text-red-500' : ''
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

export default TextField
