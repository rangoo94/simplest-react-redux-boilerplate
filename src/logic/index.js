import * as articles from './articles'
import * as app from './app'

// Load reducers

export const reducers = {
  articles: articles.reducers,
  app: app.reducers
}

// Load effects

export const effects = {
  ...articles.effects,
  ...app.effects
}
