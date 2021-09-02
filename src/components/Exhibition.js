import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import { LogoText } from '../components/Logo'

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import '../components/exhibition.css'

const Exhibition = ({ className, objkts }) => (
  <div className={className}>
    <div className="exhibition__container">
      <div className="exhibition__content">
        <Link to="/" onClick={() => {
          document.getElementsByTagName('html')[0].style.overflow = ""; 
          document.body.classList.remove("exhibition")
        }}><LogoText/></Link>
        <button className="exhibition__closebtn" onClick={() => {
            document.getElementsByTagName('html')[0].style.overflow = ""; 
            document.body.classList.remove("exhibition")
          }}><span>✖</span></button>
        {objkts &&
          <AwesomeSlider>
            {objkts.map((objkt, i) => (
              <div className="columns container">
                <div className="column is-10 is-offset-1">
                  <div>
                    <img src={objkt.image} alt={objkt.title}/>
                  </div>
                  <div style={{borderTop: '3px solid black'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '1rem'}}>
                      <div>
                        <h1 style={{margin: '1rem', textAlign: 'left'}} className="exhibition__title is-size-3 has-text-weight-semibold">{objkt.title}</h1>
                        <div className="exhibition__description" style={{margin: '1rem', whiteSpace: 'pre-wrap', textAlign: 'left'}}>{objkt.description}</div>
                      </div>
                      <div>
                        <h3 style={{margin: '1rem', opacity: '0'}} className="exhibition__price is-size-3 has-text-weight-bold">{objkt.price}<span className="has-text-weight-semibold">ꜩ</span></h3>
                        <button className="exhibition__collect block-btn">Collect</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AwesomeSlider>
        }
      </div>
    </div>
  </div>
)

Exhibition.propTypes = {
  Exhibition: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}

export default Exhibition