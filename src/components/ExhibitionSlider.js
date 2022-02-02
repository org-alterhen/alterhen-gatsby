import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import { LogoText } from './Logo'

import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import '../components/exhibition.css'

const ExhibitionSlider = ({ className, objkts }) => (
  <div className={className}>
    <div className="exhibition-slider__container">
      <div className="exhibition-slider__content">
        <Link
          to="/"
          onClick={() => {
            document.getElementsByTagName('html')[0].style.overflow = ''
            document.body.classList.remove('exhibition')
          }}
        >
          <LogoText />
        </Link>
        <button
          className="exhibition-slider__closebtn"
          onClick={() => {
            document.getElementsByTagName('html')[0].style.overflow = ''
            document.body.classList.remove('exhibition')
          }}
        >
          <span>×</span>
        </button>
        {objkts && (
          <AwesomeSlider>
            {objkts.map((objkt, i) => (
              <div className="columns container" key={i}>
                <div className="column is-10 is-offset-1">
                  <div className="exhibition-slide-objkt">
                    {objkt.image ? (
                      <img src={objkt.image} alt={objkt.title} />
                    ) : (
                      objkt.video && (
                        <video
                          className="exhibition-slider-video"
                          src={objkt.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      )
                    )}
                  </div>
                  {/* <div style={{borderTop: '3px solid black'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '1rem'}}>
                      <div>
                        <h1 style={{margin: '1rem', textAlign: 'left'}} className="exhibition-slider__title is-size-3 has-text-weight-semibold">{objkt.title}</h1>
                        <div className="exhibition-slider__description" style={{margin: '1rem', whiteSpace: 'pre-wrap', textAlign: 'left'}}>{objkt.description}</div>
                      </div>
                      <div>
                        <h3 style={{margin: '1rem', opacity: '0'}} className="exhibition-slider__price is-size-3 has-text-weight-bold">{objkt.price}<span className="has-text-weight-semibold">ꜩ</span></h3>
                        <button className="exhibition-slider__collect block-btn">Collect</button>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </AwesomeSlider>
        )}
      </div>
    </div>
  </div>
)

ExhibitionSlider.propTypes = {
  Exhibition: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default ExhibitionSlider
