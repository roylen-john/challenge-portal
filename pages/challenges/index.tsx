import {
  DotsCircleHorizontalIcon,
  ExclamationCircleIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import useSWR from 'swr'
import ChallengeCard from '../../components/challenge-card/ChallengeCard'
import Dropdown from '../../components/form-components/dropdown/Dropdown'
import withAuth from '../../components/hoc/with-auth/WithAuth'
import Paginator from '../../components/paginator/Paginator'
import { clientApiRoutes } from '../../utils/apiUtils'
import { routes } from '../../utils/constants'
import { swrFetcher } from '../../utils/utils'

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
        option.orderValue === (router.query.order || 'desc')
    )
  )

  useEffect(() => {
    if (!router.query.page || !router.query.sort || !router.query.order) {
      const newRouter = router
      router.query = {
        page: '1',
        sort: 'created_at',
        order: 'desc',
        ...router.query,
      }
      router.replace(newRouter)
    }
  }, [])

  const { data, error } = useSWR(
    [
      clientApiRoutes.GET_CHALLENGES,
      router.query.page,
      router.query.sort,
      router.query.order,
    ],
    (url, page, sort, order) =>
      swrFetcher(url, {
        params: {
          _page: page || 1,
          _sort: sort || 'created_at',
          _order: order || 'votes',
        },
      })
  )

  const handleSortChange = (value) => {
    const newRouter = router
    router.query = {
      ...router.query,
      sort: value.sortValue,
      order: value.orderValue,
    }
    router.push(newRouter)
    setSort(value)
  }

  const handleGotoNextPage = () => {
    if (Number(router.query.page) < data.records?.total_pages) {
      const newRouter = router
      router.query = {
        ...router.query,
        page: String(Number(router.query.page) + 1),
      }
      router.push(newRouter, undefined, {
        scroll: false,
      })
    }
  }

  const handleGotoPreviousPage = () => {
    if (Number(router.query.page) > 1) {
      const newRouter = router
      router.query = {
        ...router.query,
        page: String(Number(router.query.page) - 1),
      }
      router.push(newRouter, undefined, {
        scroll: false,
      })
    }
  }

  if (error)
    return (
      <div className="flex w-full h-60 justify-center m-auto items-center text-lg text-contrastNeutralBg">
        <ExclamationCircleIcon className="h-6 w-6 mr-5" />
        Failed to load content
      </div>
    )

  return (
    <div>
      <div className="px-2 sm:px-11 fixed top-16 left-0 flex flex-row-reverse items-center w-full bg-neutralBg h-16 z-10">
        <div className="w-44">
          <Dropdown
            icon={<SortDescendingIcon className="h-4 w-4 mr-3" />}
            value={sort}
            valueSelector="name"
            options={sortOptions}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <div className="h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4">
        {data && data.challenges ? (
          data.challenges.map((challenge) => {
            return (
              <ChallengeCard
                created_at={challenge.created_at}
                title={challenge.title}
                tags={challenge.tags}
                description={challenge.description}
                votes={challenge.votes}
                key={challenge.id}
                href={routes.ALL_CHALLENGES + `/${challenge.id}`}
              />
            )
          })
        ) : (
          <div className="flex w-full h-60 justify-center m-auto items-center text-lg text-contrastNeutralBg">
            <DotsCircleHorizontalIcon className="h-6 w-6 mr-5" />
            Loading...
          </div>
        )}
      </div>
      <div className="mt-4">
        {data && data.records?.total_pages > 1 && (
          <Paginator
            current={Number(router.query.page)}
            total={data.records?.total_pages}
            onNext={handleGotoNextPage}
            onPrevious={handleGotoPreviousPage}
          />
        )}
      </div>
    </div>
  )
}

export default withAuth(AllChallenges)
