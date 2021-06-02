import {
  ArrowCircleLeftIcon,
  CalendarIcon,
  DotsCircleHorizontalIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import useSWR from 'swr'
import Button from '../../components/form-components/button/Button'
import withAuth from '../../components/hoc/with-auth/WithAuth'
import { clientApiRoutes } from '../../utils/apiUtils'
import { swrFetcher } from '../../utils/utils'

export const GetChallenge = (): ReactElement => {
  const router = useRouter()
  const { data, error } = useSWR(
    [clientApiRoutes.GET_CHALLENGES + `/${router.query.id}`],
    swrFetcher
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
      <div className="px-2 sm:px-11 fixed top-16 left-0 flex flex-row items-center w-full bg-neutralBg h-16 z-10">
        <button
          className="text-white flex items-center"
          onClick={() => router.back()}
        >
          <ArrowCircleLeftIcon className="h-8 w-8 mr-2" /> <span>Back</span>
        </button>
      </div>
      <div className="h-16" />
      <div className="bg-white py-6 px-6 rounded-3xl w-full shadow-lg">
        <div className="flex items-center">
          <div className="m-1 mr-2 w-16 h-16 flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase flex-shrink-0">
            {data.created_by.name.charAt(0)}
          </div>
          <div id="header-text" className="leading-5 ml-6">
            <h4 id="name" className="text-xl font-bold">
              {data.title}
            </h4>
            <h5
              id="date"
              className="text-sm font-semibold text-neutralBgSofter flex items-center"
            >
              <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
              <span>{new Date(data.created_at).toLocaleString()}</span>
            </h5>
          </div>
          <div className="hidden ml-auto m-1 p-8 w-12 h-12 relative md:flex flex-col justify-center items-center bg-primary text-xl text-white uppercase flex-shrink-0">
            <div className="text-xs">Votes</div>
            <span>{data.votes}</span>
          </div>
        </div>
        <h5 id="tags" className="flex items-center mt-2 text-xs">
          {data.tags.map((tag, index) => {
            return (
              <div
                className="mr-4 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
                key={index}
              >
                {tag.name}
              </div>
            )
          })}
        </h5>
        <div>
          <div className="my-4 whitespace-pre-wrap">{data.description}</div>
          <div className="border-t-2"></div>

          <div className="flex justify-between md:justify-end items-center my-4">
            <div className="md:hidden m-1 p-8 w-24 h-24 relative flex flex-col justify-center items-center bg-primary text-xl text-white uppercase flex-shrink-0">
              <div className="text-xs">Votes</div>
              <span>{data.votes}</span>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="m-2">
                <Button variant="primary" fullWidth>
                  Upvote
                </Button>
              </div>
              <div className="m-2">
                <Button variant="danger" fullWidth>
                  Downvote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(GetChallenge)
