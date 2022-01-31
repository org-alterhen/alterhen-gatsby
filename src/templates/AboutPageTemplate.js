import React from 'react'
import PropTypes from 'prop-types'
import Content from '../components/Content'
import Logo from '../components/Logo'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient section-about-page">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h1
                className="title is-size-3 has-text-weight-bold is-bold-light has-text-centered"
                style={{ color: 'black' }}
              >
                <Logo />
              </h1>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}
