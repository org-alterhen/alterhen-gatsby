import React from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import ExhibitionSummary from '../components/ExhibitionSummary'
import SocialLinks from '../components/SocialLinks'
// import ExhibitionLinks from '../components/ExhibitionLinks'

export const ArtistPostTemplate = ({
  helmet,
  name,
  currentExhibition,
  pastExhibitions,
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
        <div className="container">
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
              {currentExhibition && pastExhibitions && (
                <h1 className="separating-headline">CURRENT EXHIB\T</h1>
              )}
              {currentExhibition && (
                <ExhibitionSummary exhibition={currentExhibition} />
              )}

              {pastExhibitions && (
                <h1 className="separating-headline">PAST EXHIB\TS</h1>
              )}

              {pastExhibitions &&
                pastExhibitions.map((e, i) => (
                  <ExhibitionSummary
                    key={`exhibitionsummary-${i}`}
                    exhibition={e}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ArtistPostTemplate.propTypes = {
  currentExhibition: PropTypes.shape({}),
  pastExhibitions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  published: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  helmet: PropTypes.object,
  name: PropTypes.string,
  bio: PropTypes.string,
  country: PropTypes.string,
  website: PropTypes.string,
  links: PropTypes.array,
  midbanner: PropTypes.string,
  profpic: PropTypes.string,
}
