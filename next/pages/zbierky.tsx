import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Page from '../components/pages/Page'
import { CollectionPageQuery, HomePageQuery, NewsQuery } from '../graphql'
import { client } from '../utils/gql'
import { hasAttributes, withAttributes } from '../utils/isDefined'
import { ssrTranslations } from '../utils/translations'

interface CollectionProps {
  collectionsPage: CollectionPageQuery['collectionsPage']
  contact: HomePageQuery['contact']
  news: NewsQuery['news']
}

export function Collection({ collectionsPage, contact, news }: CollectionProps) {
  const { t } = useTranslation()

  if (!collectionsPage) {
    return null
  }

  return (
    <Page
      page={collectionsPage}
      title={t('navigation.collections')}
      contactInfo={withAttributes(contact?.data)}
      newsItems={news?.data.filter(hasAttributes)}
    />
  )
}

export const getServerSideProps: GetServerSideProps<CollectionProps> = async ({ locale = 'sk' }) => {
  const [{ collectionsPage, contact }, { news }, translations] = await Promise.all([
    client.CollectionPage({ locale }),
    client.News({ locale, tag: locale === 'en' ? 'news' : 'aktuality' }),
    ssrTranslations({ locale }, ['common']),
  ])

  return {
    props: {
      collectionsPage,
      contact,
      news,
      ...translations,
    },
  }
}

export default Collection
