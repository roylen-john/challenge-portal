import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import useSWR from 'swr'
import withAuth from '../../components/hoc/with-auth/WithAuth'
import { clientApiRoutes } from '../../utils/apiUtils'
import { swrFetcher } from '../../utils/utils'

export const AllChallenges = (): ReactElement => {
  const router = useRouter()
  const { data, error } = useSWR(clientApiRoutes.GET_CHALLENGES, (url) =>
    swrFetcher(url, {
      params: {
        _page: router.query.page,
        _sort: router.query.sort,
        _order: router.query.order,
      },
    })
  )

  if (error) return <div>Failed to load challenges</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <div className="h-10 flex flex-row-reverse items-center">Toolbar</div>
      <div>Card grid</div>
    </div>
  )
}

export default withAuth(AllChallenges)
