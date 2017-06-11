import React from 'react'

import Header from './header'
import Footer from './footer'
import Content from './content'

function App ({ route, params, children }) {
  return (
    <div className="app">
      <Header />

      <Content route={ route } params={ params }>
        { children }
      </Content>

      <Footer />
    </div>
  )
}

export default App
