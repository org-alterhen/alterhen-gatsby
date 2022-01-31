import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { LogoText, LogoIcon } from '../components/Logo'

import ExhibitionsList from '../components/ExhibitionsList'

export const IndexPageTemplate = ({ content }) => {
  let userAddress
  if (typeof window !== 'undefined') {
    userAddress = localStorage.getItem('lastUserAddress')
  } else {
    userAddress = null
  }
  return (
    <div className="homepage">
      <div
        style={{
          padding: '2em',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '1',
        }}
      >
        <LogoText className="logo-black" />
        <div className="basic-header__icon">
          <LogoIcon className="logo-white" />
        </div>
      </div>
      <div className="hero">
        <div className="hero-body">
          <span className="alter-hen-logo"></span>
          <HTMLContent content={content} className="artist-post-content" />
          <Link to="/about" className="read-more">
            Read More <span>►</span>
          </Link>
        </div>
        <div className="hero-image" style={{ background: 'black' }}>
          <iframe
            title="homepage animation"
            style={{ width: '100%', height: '100%', border: '0px' }}
            src="https://sandbox.cables.gl/viewer/61409ec67478d428e57439ca"
          ></iframe>
        </div>
      </div>
      <h1 className="separating-headline">EXHIB\TIONS</h1>
      <section className="section tint-pink">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12">
                <div className="content">
                  <div className="column is-12" id="exhibitions">
                    {/* <ExhibitionsList /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {userAddress && (
        <h1 className="separating-headline collection">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://hexpo.andreasrau.eu/#${userAddress}/collection`}
          >
            YOUR COLLECT\ON
          </a>
        </h1>
      )}
    </div>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.node,
}
