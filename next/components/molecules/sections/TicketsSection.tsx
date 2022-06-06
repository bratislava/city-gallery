import cx from 'classnames'
import React from 'react'
import { TicketEntityFragment } from '../../../graphql'
import { WithAttributes } from '../../../utils/isDefined'
import CityGalleryMarkdown from '../../atoms/CityGalleryMarkdown'
import Ticket from '../Ticket/Ticket'
import Section from './Section'

interface TicketsSectionProps {
  tickets: WithAttributes<TicketEntityFragment>[]
  title?: string
  text?: string
  anchor?: string
}

const TicketsSection = ({ tickets, title, text, anchor }: TicketsSectionProps) => {
  return (
    <Section anchor={anchor} title={title}>
      <div
        className={cx('px-xStandard pb-yStandard', {
          'py-yStandard': !title,
          'pb-yStandard': title,
        })}
      >
        <CityGalleryMarkdown content={text} />

        <div className="flex flex-wrap justify-between mt-24 lg:justify-stretch lg:flex-nowrap">
          {tickets?.map((ticket) => (
            <Ticket
              key={ticket.attributes.price}
              title={ticket.attributes.title}
              price={ticket.attributes.price}
              description={ticket.attributes.description}
              link={ticket.attributes.link}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default TicketsSection
