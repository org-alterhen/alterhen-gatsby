import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import { LogoText } from './Logo'
import ObjktEmbed from './ObjktEmbed'

import AwesomeSlider from 'react-awesome-slider'
import './styles/exhibition-slider.sass'

const ExhibitionSlider = ({
  objkts,
  setSliderVisible,
  sliderSlide,
  userAddress,
  artistName,
  extraClasses,
}) => (
  <div className={`exhibition-slider ${extraClasses}`}>
    <div className="exhibition-slider__container">
      <div className="exhibition-slider__content">
        <Link
          className="exhibition-slider__logo"
          to="/"
          onClick={() => {
            setSliderVisible(false)
          }}
        >
          <LogoText />
        </Link>
        <button
          className="exhibition-slider__closebtn"
          onClick={() => {
            setSliderVisible(false)
          }}
        >
          <span>×</span>
        </button>
        {objkts && (
          <AwesomeSlider selected={sliderSlide}>
            {objkts.map((objkt, i) => (
              <div className="exhibition-slider__slide" key={i}>
                <ObjktEmbed
                  objkt={objkt}
                  userAddress={userAddress}
                  artistName={artistName}
                />
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
