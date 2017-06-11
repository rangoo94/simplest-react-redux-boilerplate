import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import AppProvider from '../providers/app'
import RouterProvider from '../providers/router'

function Provider ({ app, children }) {
  return (
    <AppProvider app={ app }>
      <ReduxProvider store={ app.store }>
        <RouterProvider router={ app.router }>
          { children }
        </RouterProvider>
      </ReduxProvider>
    </AppProvider>
  )
}

export default Provider
