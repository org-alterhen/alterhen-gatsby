import React from 'react'
import PropTypes from 'prop-types'
import { SocialIcon } from 'react-social-icons'

const defaultIcon = {
  icon: 'M24,49.6c2.4,1.1,5.1,1.7,7.9,1.7c10.7,0,19.3-8.7,19.3-19.3s-8.7-19.3-19.3-19.3l0,0c-10.7,0-19.3,8.7-19.3,19.3c0,7.7,4.5,14.4,11,17.5l1.6-1.9l8.8-9.9c0.2-0.2,0.3-0.5,0.3-0.8v-3.6c0-0.7-0.5-1.2-1.2-1.2c-4.3,0-8.8-4.4-8.8-4.5c-0.2-0.2-0.5-0.4-0.9-0.4h-4.8c-0.7,0-1.2,0.5-1.2,1.2v7.3c0,0.5,0.3,0.9,0.7,1.1l4.2,2.1v7.1c-4.4-3.1-7.3-8.1-7.3-13.9c0-2.6,0.6-5.1,1.6-7.3h4.4c0.3,0,0.6-0.1,0.9-0.4l4.8-4.8c0.2-0.2,0.4-0.5,0.4-0.9v-2.9c1.5-0.5,3.2-0.7,4.8-0.7c2.7,0,5.2,0.6,7.4,1.7c-0.2,0.1-0.3,0.3-0.5,0.4c-1.4,1.4-2.1,3.2-2.1,5.1s0.8,3.8,2.1,5.1c1.4,1.4,3.2,2.1,5.1,2.1c0.1,0,0.2,0,0.4,0c0.5,2,1.5,7.1-0.3,14.1c0,0.1,0,0.1,0,0.2c-3.1,3.1-7.4,5.1-12.1,5.1l0,0l0,0c-2.2,0-4.3-0.4-6.2-1.2',
  mask: 'M64,63.9H0v-64h64V63.9z M24,49.5c2.4,1.1,5.1,1.7,7.9,1.7c10.7,0,19.3-8.7,19.3-19.3s-8.7-19.3-19.3-19.3l0,0c-10.7,0-19.3,8.7-19.3,19.3c0,7.7,4.5,14.4,11,17.5l1.6-1.9l8.8-9.9c0.2-0.2,0.3-0.5,0.3-0.8v-3.6c0-0.7-0.5-1.2-1.2-1.2c-4.3,0-8.8-4.4-8.8-4.5c-0.2-0.2-0.5-0.4-0.9-0.4h-4.8c-0.7,0-1.2,0.5-1.2,1.2v7.3c0,0.5,0.3,0.9,0.7,1.1l4.2,2.1v7.1c-4.4-3.1-7.3-8.1-7.3-13.9c0-2.6,0.6-5.1,1.6-7.3h4.4c0.3,0,0.6-0.1,0.9-0.4l4.8-4.8c0.2-0.2,0.4-0.5,0.4-0.9v-2.9c1.5-0.5,3.2-0.7,4.8-0.7c2.7,0,5.2,0.6,7.4,1.7c-0.2,0.1-0.3,0.3-0.5,0.4c-1.4,1.4-2.1,3.2-2.1,5.1s0.8,3.8,2.1,5.1c1.4,1.4,3.2,2.1,5.1,2.1c0.1,0,0.2,0,0.4,0c0.5,2,1.5,7.1-0.3,14.1c0,0.1,0,0.1,0,0.2c-3.1,3.1-7.4,5.1-12.1,5.1l0,0l0,0c-2.2,0-4.3-0.4-6.2-1.2',
  color: '#49a9e9',
}

const SocialLinks = ({ links }) => (
  <>
    {links.hicetnunc && (
      <SocialIcon
        icon="web"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={links.hicetnunc}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.website && (
      <SocialIcon
        icon="web"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={links.website}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.twitter && (
      <SocialIcon
        icon="twitter"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={`https://twitter.com/${links.twitter}`}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.instagram && (
      <SocialIcon
        icon="instagram"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={`https://instagram.com/${links.instagram}`}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.facebook && (
      <SocialIcon
        icon="facebook"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={`https://facebook.com/${links.facebook}`}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.tumblr && (
      <SocialIcon
        icon="tumblr"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={`https://tumblr.com/${links.tumblr}`}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.linktree && (
      <SocialIcon
        icon="web"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={`https://linktr.ee/${links.linktree}`}
        style={{ height: 26, width: 26 }}
      />
    )}
    {links.henlink && (
      <SocialIcon
        icon="web"
        fgColor="rgba(255,255,255,1)"
        bgColor="rgba(60,60,60,1)"
        defaultSVG={defaultIcon}
        url={`https://hen.link/${links.henlink}`}
      />
    )}
  </>
)

SocialLinks.propTypes = {
  Logo: PropTypes.node,
  className: PropTypes.string,
}

export default SocialLinks
