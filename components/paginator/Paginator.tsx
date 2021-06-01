import React, { ReactElement } from 'react'
import { classNames } from '../../utils/utils'

interface iPaginatorProps {
  current: number
  total: number
  onNext?: () => void
  onPrevious?: () => void
}

const Paginator = ({
  current,
  total,
  onNext,
  onPrevious,
}: iPaginatorProps): ReactElement => {
  return (
    <ul className="flex pl-0 list-none rounded my-2 w-full justify-end items-center">
      <li>
        <label className="block text-contrastNeutralBg text-sm font-bold mr-4">
          Page
        </label>
      </li>
      <li
        className={classNames(
          'relative block py-2 px-3 leading-tight bg-white border border-gray-300 border-r ml-0 rounded-l w-24',
          current > 1 &&
            'hover:bg-primary hover:text-white hover:border-primary',
          current > 1 ? 'text-black' : 'text-gray-300'
        )}
        onClick={onPrevious}
      >
        Previous
      </li>
      <li
        className={classNames(
          'relative block py-2 px-3 leading-tight bg-white border-t border-b border-gray-300 text-right text-black'
        )}
      >
        {current}
      </li>
      <li
        className={classNames(
          'relative block py-2 px-3 leading-tight bg-white border border-gray-300 border-l rounded-r w-24 text-right',
          current < total &&
            'hover:bg-primary hover:text-white hover:border-primary',
          current < total ? 'text-black' : 'text-gray-300'
        )}
        onClick={onNext}
      >
        Next
      </li>
    </ul>
  )
}

export default Paginator
