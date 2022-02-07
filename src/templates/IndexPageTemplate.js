import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { random } from 'lodash-es'

import { HTMLContent } from '../components/Content'
import { LargeCard } from '../components/LargeCard'

export const IndexPageTemplate = ({
  content,
  exhibitionGroups,
  shopContent,
}) => {
  let userAddress

  if (typeof window !== 'undefined') {
    userAddress = localStorage.getItem('lastUserAddress')
  } else {
    userAddress = null
  }

  const shopImgTransform = (img) => {
    if (img.includes('.gif')) return img
    if (!img.includes('ucarecdn')) return img
    return img.substr(0, 58) + '-/resize/290x' + img.substr(57, 999)
  }

  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-body">
          <span className="alter-hen-logo"></span>
          <HTMLContent content={content} className="artist-post-content" />
          <Link to="/about" className="read-more">
            Read More <span>►</span>
          </Link>
          <a class="block-btn hero-body__cta" href="#exhibitions">
            View exhibitions
          </a>

          <a
            class="if-credit"
            href="https://immaterialfuture.org"
            target="_blank"
          >
            <span class="if">
              a\terHEN is supported by
              <br />
              <span>Immaterial Future Association</span>
              <span class="logo"></span>
            </span>
          </a>
        </div>
        <div
          className="hero-image hero-image--dark-overlay"
          style={{ background: 'black' }}
        >
          <iframe
            title="homepage animation"
            style={{ width: '100%', height: '100%', border: '0px' }}
            src="https://sandbox.cables.gl/viewer/61409ec67478d428e57439ca"
          ></iframe>
        </div>
      </div>
      <h1 className="separating-headline" id="exhibitions">
        EXHIB\TIONS
      </h1>
      <section className="section section--tight-mobile">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12">
                {exhibitionGroups &&
                  exhibitionGroups.map((g, i) => (
                    <LargeCard
                      key={`exhibitiongroup-${i}`}
                      title={g.frontmatter.title}
                      summary={g.frontmatter.summary}
                      url={g.fields.slug}
                      image={g.frontmatter.featuredimage}
                      imageAlt={`Featured artwork for ${g.frontmatter.title}`}
                      logoUrl={g.frontmatter.logo}
                      credit={g.frontmatter.credit}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1 className="separating-headline" id="shop">
        <Link
          to={shopContent.fields.slug}
          className="separating-headline__link"
        >
          A\TERHEN SHOP
        </Link>
      </h1>
      <section className="section section--tight-mobile">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12">
                <div className="product-listing">
                  {shopContent.frontmatter.objkts &&
                    shopContent.frontmatter.objkts.slice(0, 4).map((o, i) => (
                      <Link
                        className="product-listing__item"
                        to={shopContent.fields.slug}
                        key={`product-${i}`}
                        style={{ order: random(1, 999) }}
                      >
                        <img
                          src={shopImgTransform(o.image)}
                          alt={`Poster artwork for ${o.title}`}
                        />
                      </Link>
                    ))}
                </div>
                <Link
                  to={shopContent.fields.slug}
                  className="block-btn block-btn--centered"
                >
                  Visit shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {userAddress && (
        <h1 className="separating-headline collection">
          <a
            className="separating-headline__link"
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
  title: PropTypes.string,
  content: PropTypes.node,
}
