import { ContentPageEntity } from '../../graphql'
import { hasAttributes } from '../../utils/isDefined'
import Link from '../atoms/Link'

interface ResultsProps {
  results: ContentPageEntity[]
  header: string
}

const Results = ({ header, results }: ResultsProps) => {
  return (
    <div className="flex-col">
      <h3 className="text-xxl text-white ">{header}</h3>
      <div className="mt-10 flex h-full flex-col gap-5">
        {results
          ?.filter(hasAttributes)
          .slice(0, 3)
          .map((result) => {
            const { slug, title, tags } = result.attributes
            return (
              <Link key={slug} className="text-white" preserveStyle href={`/detail/${slug}`}>
                <p className="text-md">{title}</p>
                {tags ? (
                  <div className="flex gap-2">
                    {tags.data.filter(hasAttributes).map((tag) => {
                      return <p key={tag.attributes.slug}>{tag.attributes.title}</p>
                    })}
                  </div>
                ) : null}
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default Results
