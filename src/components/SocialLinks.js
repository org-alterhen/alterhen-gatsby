import React from 'react'
import PropTypes from 'prop-types'
import {SocialMediaIconsReact} from 'social-media-icons-react';

const SocialLinks = ({ links }) => (
  <>
  { links.hicetnunc && <SocialMediaIconsReact 
    icon="web"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={links.hicetnunc}
    size="26"
  />}
  { links.website && <SocialMediaIconsReact 
    icon="web"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={links.website}
    size="26"
  />}
  { links.twitter && <SocialMediaIconsReact 
    icon="twitter"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={`https://twitter.com/${links.twitter}`}
    size="26"
  />}
  { links.instagram && <SocialMediaIconsReact 
    icon="instagram"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={`https://instagram.com/${links.instagram}`}
    size="26"
  />}
  { links.facebook && <SocialMediaIconsReact 
    icon="facebook"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={`https://facebook.com/${links.facebook}`}
    size="26"
  />}
  { links.tumblr && <SocialMediaIconsReact 
    icon="tumblr"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={`https://tumblr.com/${links.tumblr}`}
    size="26"
  />}
  { links.linktree && <SocialMediaIconsReact 
    icon="web"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={`https://linktr.ee/${links.linktree}`}
    size="26"
  />}
  { links.henlink && <SocialMediaIconsReact 
    icon="web"
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(60,60,60,1)"
    iconSize="3"
    borderWidth="0"
    roundness="50%"
    url={`https://henlink.com/${links.henlink}`}
    size="26"
  />}
  </>
)

SocialLinks.propTypes = {
  Logo: PropTypes.node,
  className: PropTypes.string,
}

export default SocialLinks