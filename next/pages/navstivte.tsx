import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Page from '../components/pages/Page'
import { NewsQuery, VisitUsPageQuery } from '../graphql'
import { client } from '../utils/gql'
import { hasAttributes, withAttributes } from '../utils/isDefined'
import { getRouteForLocale } from '../utils/localeRoutes'
import { ssrTranslations } from '../utils/translations'

interface VisitUsProps {
  visitUsPage: VisitUsPageQuery['visitUsPage']
  contact: VisitUsPageQuery['contact']
  news: NewsQuery['news']
  tickets: VisitUsPageQuery['tickets']
}

const VisitUs = ({ visitUsPage, contact, news, tickets }: VisitUsProps) => {
  const { t } = useTranslation()

  if (!visitUsPage) {
    return null
  }

  return (
    <Page
      page={visitUsPage}
      title={t('navigation.visitUs')}
      contactInfo={withAttributes(contact?.data)}
      newsItems={news?.data.filter(hasAttributes)}
      tickets={tickets?.data.filter(hasAttributes)}
    />
  )
}

export const getServerSideProps: GetServerSideProps<VisitUsProps> = async ({ locale = 'sk' }) => {
  const [{ visitUsPage, contact, tickets }, { news }, translations] = await Promise.all([
    client.VisitUsPage({ locale }),
    client.News({ locale, tag: getRouteForLocale('aktuality', locale) }),
    ssrTranslations({ locale }, ['common']),
  ])

  return {
    props: {
      visitUsPage,
      contact,
      news,
      tickets,
      ...translations,
    },
  }
}

export default VisitUs
