export const APP_REDIRECT = (state, { url }) => ({
  ...state,
  url
})

export const APP_TITLE = (state, { title }) => ({
  ...state,
  title
})

export const APP_META = (state, { tags, append }) => ({
  ...state,
  meta: {
    ...(append ? state.meta : {}),
    ...tags
  }
})
