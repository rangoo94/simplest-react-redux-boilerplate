import React from 'react'

function Error ({ route, params }) {
  return (
    <div className="page page--error">
      <h1>Error { params.code }</h1>
      Something went wrong.
    </div>
  )
}

export default Error
