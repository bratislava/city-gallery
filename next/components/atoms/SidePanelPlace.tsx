import LocationIcon from '../../assets/icons/location.svg'
import { ContentPagePlaceFragment } from '../../graphql'

export interface SidePanelPlaceProps {
  placeFragment: ContentPagePlaceFragment
  isOneLine?: boolean
}

export const SidePanelPlace = ({ placeFragment, isOneLine = false }: SidePanelPlaceProps) => {
  const { place, placeTitle, placeAddress } = placeFragment

  if (!place?.data && !placeTitle && !placeAddress) {
    return null
  }

  if (!place?.data?.attributes?.title && !placeTitle && isOneLine) {
    return null
  }

  return (
    <div className="text-nav">
      {!isOneLine && (
        <div className="mb-3">
          <LocationIcon className="dw-[48px]" />
        </div>
      )}
      <address className="flex items-center gap-3 not-italic">
        {isOneLine && <LocationIcon className="dw-[24px]" />}
        <span>
          {placeTitle || place?.data?.attributes?.title}
          {!isOneLine && <br />}
          {!isOneLine && (placeAddress || place?.data?.attributes?.address)}
        </span>
      </address>
    </div>
  )
}
