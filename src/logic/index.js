import * as articles from './articles'

// Load reducers

export const reducers = {
  articles: articles.reducers
}

// Load effects

export const effects = {
  ...articles.effects
}
