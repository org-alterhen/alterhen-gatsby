import React from 'react'

/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  var elem = document;
  if (elem.exitFullscreen) {
    elem.exitFullscreen();
  } else if (elem.webkitExitFullscreen) { /* Safari */
    elem.webkitExitFullscreen();
  } else if (elem.msExitFullscreen) { /* IE11 */
    elem.msExitFullscreen();
  }
}

const Zoomer = ({ children }) => {
  // zoom state
  const [zoom, setZoom] = React.useState(false)

  return (
    <button className={`exhibition-page-button`+(zoom?' exhibition-zoomed':'')} onClick={() => {
        setZoom(!zoom)
        if (zoom) {
          console.log('closing')
          closeFullscreen()
        } else {
          console.log('opening')
          openFullscreen()
        }
    }}>
        {children}
    </button>
  )
}

export default Zoomer