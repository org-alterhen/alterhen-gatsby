import React from 'react'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import { hashToURL } from '../utils/hicDex'

const ObjktEmbed = ({ objkt, userAddress, artistName }) => {
  let output = null
  let type = null

  if (objkt.image && objkt.image !== '') {
    type = 'image'
    output = (
      <PreviewCompatibleImage
        imageInfo={{
          image: objkt.image,
          alt: `${objkt.title} by ${artistName}`,
        }}
        className="objkt-embed__asset"
      />
    )
  } else if (objkt.video && objkt.video !== '') {
    type = 'video'
    output = (
      <video
        className="objkt-embed__asset"
        src={objkt.video}
        autoPlay
        loop
        playsInline
        preload=""
      />
    )
  } else if (
    objkt.hicdex &&
    (objkt.hicdex.mime === 'model/gltf-binary' ||
      objkt.hicdex.mime === 'model/gltf+json')
  ) {
    const artifactUrl = hashToURL(objkt.hicdex.artifact_uri)
    const options = {
      src: artifactUrl,
      autoplay: true,
      'auto-rotate': true,
      'data-js-focus-visible': true,
      'interaction-prompt': 'none',
      ar: true,
      'ar-modes': 'webxr scene-viewer quick-look',
      'camera-controls': true,
    }
    type = 'gltf'
    output = (
      <div className="objkt-embed__asset">
        <model-viewer {...options}></model-viewer>
      </div>
    )
  } else if (objkt.hicdex && objkt.hicdex.mime === 'application/x-directory') {
    const artifactUrl = hashToURL(objkt.hicdex.artifact_uri)
    type = 'html'
    output = (
      <div className="objkt-embed__asset">
        <iframe
          title="html-embed"
          src={`${artifactUrl}/?creator=${objkt.hicdex.creator_id}&viewer=${userAddress}&objkt=${objkt.objkt}`}
          sandbox="allow-scripts allow-same-origin"
          allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking;"
        />
      </div>
    )
  }

  return <div className={`objkt-embed objkt-embed--${type}`}>{output}</div>
}

export default ObjktEmbed
