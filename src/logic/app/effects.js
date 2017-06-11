import browserOnly from '../../utils/browser-only'
import History from '../../utils/history'
import { remove } from '../../utils/dom'

/**
 * Set current page URL to the one which is in app state
 */
export const APP_REDIRECT = browserOnly(({ url }, dispatch, state) => {
  History.pushState(null, state.app.title, url)
})

/**
 * Set current page title to the one which is in app state
 */
export const APP_TITLE = browserOnly(({ title }) => {
  if (document.title !== title) {
    document.title = title
  }
})

/**
 * Set current meta tags to the one which is in app state
 */
export const APP_META = browserOnly((action, dispatch, state) => {
  const head = document.head
  const tags = state.app.meta

  // Remove all simple meta tags with content
  head.querySelectorAll('meta[name]').forEach(remove)

  // Append missing meta tags to DOM
  for (let name of Object.keys(tags)) {
    const el = document.createElement('meta')
    el.name = name
    el.content = tags[name]

    head.appendChild(el)
  }
})
