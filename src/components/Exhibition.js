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
        <AwesomeSlider>
          {objkts.map((objkt, i) => (
            <div className="columns container">
              <div className="column is-10 is-offset-1">
                <div>{JSON.stringify(objkt)}</div>
              </div>
            </div>
          ))}
        </AwesomeSlider>
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