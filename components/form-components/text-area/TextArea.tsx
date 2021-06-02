import React from 'react'
import { classNames } from '../../../utils/utils'

export interface iTextAreaProps {
  name: string
  label?: string
  placeholder?: string
  rows?: number
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  value: string
  onChange: () => void
  onBlur: () => void
}

const TextArea = React.forwardRef<HTMLTextAreaElement, iTextAreaProps>(
  (
    {
      name,
      label,
      placeholder,
      rows = 10,
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
        <textarea
          className={classNames(
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primaryBold',
            error ? 'border-red-500' : ''
          )}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          rows={rows}
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

export default TextArea
