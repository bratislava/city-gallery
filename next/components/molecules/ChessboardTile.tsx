import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { SectionItemEntityFragment } from '../../graphql';
import { getContentPageColor } from '../../utils/getContentPageColor';
import { hasAttributes, WithAttributes } from '../../utils/isDefined';
import Button from '../atoms/Button';
import Link from '../atoms/Link';
export interface ChessboardTileProps {
  sectionItem: WithAttributes<SectionItemEntityFragment>;
  isLeft?: boolean;
  showTags?: boolean;
}

export const ChessboardTile = ({
  sectionItem,
  isLeft,
  showTags,
}: ChessboardTileProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { slug, coverMedia, title, subtitle, tags, perex } =
    sectionItem.attributes;

  return (
    <Link href={`/detail/${slug}`} preserveStyle noUnderline>
      <article
        className={cx('lg:flex min-h-[400px] group', {
          'flex-row-reverse': isLeft,
        })}
      >
        <div className="w-full h-[300px] lg:w-1/2 lg:h-auto bg-gmbLightGray relative">
          {coverMedia?.data?.attributes ? (
            <Image
              src={coverMedia.data.attributes.url}
              alt={coverMedia.data.attributes.alternativeText ?? ''}
              layout="fill"
              objectFit="cover"
              unoptimized
            />
          ) : null}
        </div>
        <div
          className="flex flex-col items-start flex-1 w-full px-xStandard py-yStandard space-y-yStandard lg:w-1/2"
          style={{ background: getContentPageColor(sectionItem) }}
        >
          <hgroup>
            <h3 className="text-xl text-h">{title}</h3>
            <p className="text-xl font-regular">{subtitle}</p>
          </hgroup>

          {showTags && tags && (
            <div className="flex space-x-3">
              {tags.data.filter(hasAttributes).map((tag) => (
                <Link
                  href={`${router.pathname}/?tags=${tag.attributes.slug}`}
                  key={tag.attributes.slug}
                >
                  {tag.attributes.title}
                </Link>
              ))}
            </div>
          )}

          {/* empty div to push button to the bottom of the tile */}
          <div className="flex-grow hidden p-0 m-0 lg:block" />

          {perex ? (
            <div className="text-md">{perex?.substring(0, 200)}…</div>
          ) : null}

          <Button
            // href={`/detail/${data.slug}`}
            className="group-hover:text-white group-hover:bg-gmbDark"
          >
            {t('common.detail')}
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default ChessboardTile;
