import React from 'react'

import Switcher from './switcher'

function Content ({ route, params, children }) {
  return (
    <div className="content">
      <Switcher active={ route } props={{ route, params }}>
        { children }
      </Switcher>
    </div>
  )
}

export default Content
