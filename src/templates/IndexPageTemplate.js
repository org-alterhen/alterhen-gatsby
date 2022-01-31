import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { LogoText, LogoIcon } from '../components/Logo'
import { LargeCard } from '../components/LargeCard'

export const IndexPageTemplate = ({ content, exhibitionGroups }) => {
  let userAddress

  if (typeof window !== 'undefined') {
    userAddress = localStorage.getItem('lastUserAddress')
  } else {
    userAddress = null
  }

  return (
    <div className="homepage">
      <div className="basic-header basic-header--on-top">
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
      <section className="section section--tight-mobile">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12" id="exhibitions">
                {exhibitionGroups &&
                  exhibitionGroups.map((g, i) => (
                    <LargeCard
                      key={`exhibitiongroup-${i}`}
                      title={g.frontmatter.title}
                      summary={g.frontmatter.summary}
                      url={g.fields.slug}
                      image={g.frontmatter.featuredimage}
                      imageAlt={`Featured artwork for ${g.frontmatter.title}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1 className="separating-headline">A\TERHEN SHOP</h1>
      <section className="section section--tight-mobile">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12" id="shop"></div>
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
  title: PropTypes.string,
  content: PropTypes.node,
}
