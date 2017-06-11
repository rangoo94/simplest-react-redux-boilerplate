export const redirect = url => ({
  type: 'APP_REDIRECT',
  url
})

export const setTitle = title => ({
  type: 'APP_TITLE',
  title
})

export const setMetaTags = (tags, append) => ({
  type: 'APP_META',
  tags
})

export const appendMetaTags = tags => setMetaTags(tags, true)
