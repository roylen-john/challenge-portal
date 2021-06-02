import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, XCircleIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import { iTag } from '../../../models/tag.model'
import { classNames } from '../../../utils/utils'

export interface iTagPickerProps {
  name: string
  label?: string
  placeholder?: string
  options: iTag[]
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  value: iTag[]
  onChange: (value) => void
  onBlur: () => void
}

const TagPicker = React.forwardRef<HTMLButtonElement, iTagPickerProps>(
  (
    {
      name,
      label,
      placeholder,
      options,
      error = false,
      helperText,
      fullWidth,
      value,
      onChange,
    },
    ref
  ) => {
    const [selectedTag, setSelectedTag] = useState(null)

    const onTagChange = (selected) => {
      if (!value.find((tag) => tag.id === selected.id)) {
        onChange([...value, selected])
        setSelectedTag(null)
      }
    }

    const handleRemoveTag = (index) => {
      const tagsCopy = [...value]
      tagsCopy.splice(index, 1)
      onChange(tagsCopy)
    }

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
        <ul
          className={classNames(
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex flex-wrap items-center',
            error ? 'border-red-500' : ''
          )}
        >
          {value.map((tag, index) => (
            <li
              key={index}
              className="mr-2 my-2 inline-flex items-center font-bold leading-sm uppercase pl-2 bg-green-200 text-green-700 rounded-full"
            >
              {tag.name}
              <button
                type="button"
                className="rounded-full focus:outline-none focus:ring focus:border-primaryBold"
                onClick={() => handleRemoveTag(index)}
              >
                <XCircleIcon className="4-6 h-6" />
              </button>
            </li>
          ))}
          <li className="relative my-2">
            <Listbox value={selectedTag} onChange={onTagChange}>
              {value.length < options.length && (
                <Listbox.Button
                  className="relative pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring focus:border-primaryBold sm:text-sm rounded-sm"
                  ref={ref}
                >
                  {placeholder}{' '}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
              )}
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full min-w-min py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map(
                    (option) =>
                      !value.find((tag) => tag.id === option.id) && (
                        <Listbox.Option
                          key={option.id}
                          value={option}
                          className={({ active }) =>
                            `${
                              active ? 'text-white bg-primary' : 'text-gray-900'
                            }
                              cursor-default select-none relative py-2 px-4`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`${
                                  selected ? 'font-medium' : 'font-normal'
                                } block truncate`}
                              >
                                {option.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      )
                  )}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </li>
        </ul>
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

export default TagPicker
