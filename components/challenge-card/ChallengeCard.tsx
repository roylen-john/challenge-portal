import Link from 'next/link'
import React, { ReactElement } from 'react'

interface iChallengeCardProps {
  date?: string
  title?: string
  tags?: string[]
  tagLimit?: number
  description?: string
  votes?: number
}

const ChallengeCard = ({
  date,
  title,
  tags,
  tagLimit = 2,
  description,
  votes,
}: iChallengeCardProps): ReactElement => {
  return (
    <div className="bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg flex flex-col">
      <div id="header" className="flex items-start mb-4 h-24">
        <div id="header-text" className="leading-5">
          <h4 id="name" className="text-lg font-semibold">
            {title}
          </h4>
          <h5 id="date" className="text-sm font-semibold text-neutralBgSofter">
            {new Date(date).toLocaleString()}
          </h5>
          <h5 id="tags" className="flex items-center mt-2 text-xs">
            {tags.slice(0, tagLimit).map((tag, index) => {
              return (
                <div
                  className="mr-4 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
                  key={index}
                >
                  {tag}
                </div>
              )
            })}
            {tags.length > tagLimit && (
              <span className="font-bold">+{`${tags.length - tagLimit}`}</span>
            )}
          </h5>
        </div>
        <div className="ml-auto m-1 p-8 w-12 h-12 relative flex flex-col justify-center items-center bg-primary text-xl text-white uppercase flex-shrink-0">
          <div className="text-xs">Votes</div>
          <span>{votes}</span>
        </div>
      </div>
      <div id="description">
        <div className="text-gray-600 line-clamp-2">{description}</div>
      </div>
      <div className="my-auto mb-4" />
      <Link href="#">
        <a
          className="bg-primary text-white transition duration-200 ease-out text-contrastNeutralBgSoft hover:bg-primaryBold px-3 py-2 rounded text-sm font-medium text-center"
          role="link"
        >
          More Details
        </a>
      </Link>
    </div>
  )
}

export default ChallengeCard
