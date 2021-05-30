import {
  DotsCircleHorizontalIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { ReactElement, useState, Fragment } from 'react'
import useSWR from 'swr'
import ChallengeCard from '../../components/challenge-card/ChallengeCard'
import withAuth from '../../components/hoc/with-auth/WithAuth'
import { clientApiRoutes } from '../../utils/apiUtils'
import { swrFetcher } from '../../utils/utils'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const sortOptions = [
  { name: '🔼 Created At', sortValue: 'created_at', orderValue: 'asc' },
  { name: '🔽 Created At', sortValue: 'created_at', orderValue: 'desc' },
  { name: '🔼 Votes', sortValue: 'votes', orderValue: 'asc' },
  { name: '🔽 Votes', sortValue: 'votes', orderValue: 'desc' },
]

export const AllChallenges = (): ReactElement => {
  const router = useRouter()
  const [sort, setSort] = useState(
    sortOptions.find(
      (option) =>
        option.sortValue === (router.query.sort || 'created_at') &&
        option.orderValue === (router.query.order || 'votes')
    )
  )

  const { data, error } = useSWR(clientApiRoutes.GET_CHALLENGES, (url) =>
    swrFetcher(url, {
      params: {
        _page: router.query.page,
        _sort: router.query.sort,
        _order: router.query.order,
      },
    })
  )

  if (error)
    return (
      <div className="flex w-full h-60 justify-center m-auto items-center text-lg text-contrastNeutralBg">
        <ExclamationCircleIcon className="h-6 w-6 mr-5" />
        Failed to load content
      </div>
    )
  if (!data)
    return (
      <div className="flex w-full h-60 justify-center m-auto items-center text-lg text-contrastNeutralBg">
        <DotsCircleHorizontalIcon className="h-6 w-6 mr-5" />
        Loading...
      </div>
    )

  return (
    <div>
      <div className="px-2 sm:px-11 fixed top-16 left-0 flex flex-row-reverse items-center w-full bg-neutralBg h-16 z-10">
        <div className="w-44">
          <Listbox value={sort} onChange={setSort}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{sort.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortOptions.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900'
                        }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? 'font-medium' : 'font-normal'
                            } block truncate`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? 'text-amber-600' : 'text-amber-600'
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="h-16" />
      <div className="grid grid-cols-1 grid-row-12 lg:grid-cols-2 lg:grid-rows-6 xl:grid-cols-3 xl:grid-rows-4 gap-4">
        {data &&
          data.data.map((challenge) => {
            return (
              <ChallengeCard
                date={challenge.created_at}
                title={challenge.title}
                tags={challenge.tags.map((tag) => tag.name)}
                description={challenge.description}
                votes={challenge.votes}
                key={challenge.id}
              />
            )
          })}
      </div>
    </div>
  )
}

export default withAuth(AllChallenges)
