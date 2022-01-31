import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import SocialLinks from '../components/SocialLinks'
// import ExhibitionLinks from '../components/ExhibitionLinks'

export const ArtistPostTemplate = ({
  helmet,
  name,
  title,
  description,
  statement,
  country,
  website,
  instagram,
  twitter,
  facebook,
  henlink,
  hicetnunc,
  linktree,
  tumblr,
  bio,
  profpic,
  midbanner = null,
}) => {
  return (
    <>
      {midbanner && (
        <PreviewCompatibleImage
          imageInfo={{
            image: midbanner,
            alt: `page break banner by ${name}`,
          }}
          className="top-banner breakout-width"
        />
      )}
      <section className="section artist-post">
        {helmet || ''}
        <div className="container content">
          <div className="columns" style={{ margin: '0' }}>
            <div className="column is-one-third artist-post-sidebar">
              {profpic && (
                <PreviewCompatibleImage
                  imageInfo={{
                    image: profpic,
                    alt: name,
                  }}
                  className="artist-profpic"
                />
              )}
              <div className="artist-socials">
                <SocialLinks
                  links={{
                    website: website,
                    instagram: instagram,
                    twitter: twitter,
                    facebook: facebook,
                    linktree: linktree,
                    henlink: henlink,
                    tumblr: tumblr,
                    hicetnunc: hicetnunc,
                  }}
                />
              </div>
              <h2
                style={{ marginTop: 0 }}
                className="is-size-5 has-text-weight-bold"
              >
                {name}
              </h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>{bio}</p>
            </div>

            <div className="column is-two-thirds">
              <div className="exhibition__title">
                <h1>{title}</h1>
              </div>
              <p className="exhibition__description">{statement}</p>
              <br />
              <br />
              <div>
                <Link
                  to={`/exhibition/${title
                    .toLowerCase()
                    .replace(/[ ]/g, '-')
                    .replace(/["|'|,|_]/g, '')}`}
                  className="block-btn"
                >
                  Enter Exhibition
                </Link>
                {/* <ExhibitionLinks posts={[title]}></ExhibitionLinks> */}
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ArtistPostTemplate.propTypes = {
  published: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  helmet: PropTypes.object,
  name: PropTypes.string,
  bio: PropTypes.string,
  statement: PropTypes.string,
  country: PropTypes.string,
  website: PropTypes.string,
  links: PropTypes.array,
  midbanner: PropTypes.string,
  profpic: PropTypes.string,
}
