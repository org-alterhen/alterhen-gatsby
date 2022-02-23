import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        <script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></script>
        {props.postBodyComponents}

        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(src, cb) {
              var s = document.createElement('script'); s.setAttribute('src', src);
              s.onload = cb; (document.head || document.body).appendChild(s);
            })('https://ucarecdn.com/libs/blinkloader/3.x/blinkloader.min.js', function() {
              window.Blinkloader.optimize({
                pubkey:'4b39f9f7d0ee680e7206',
                fadeIn:true,
                lazyload:true,
                smartCompression:true,
                responsive:true,
                retina:true,
                webp:true
              });
            })
            `,
          }}
        />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
