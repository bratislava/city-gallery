export type StrapiImageFormat = {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  path: string | null
  size: number
  url: string
  width: number
}

export type StrapiImageFormats = {
  small: StrapiImageFormat
  meditum: StrapiImageFormat
  thumbnail: StrapiImageFormat
}
