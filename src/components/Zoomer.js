import React from 'react'

const Zoomer = ({ children }) => {
  // zoom state
  const [zoom, setZoom] = React.useState(false)

  return (
    <button className={`exhibition-page-button`+(zoom?' exhibition-zoomed':'')} onClick={() => {
        setZoom(!zoom)
    }}>
        {children}
    </button>
  )
}

export default Zoomer