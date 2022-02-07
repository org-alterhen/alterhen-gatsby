import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import ExhibitionsList from '../components/ExhibitionsList'

export const ExhibitionGroupPageTemplate = ({
  title,
  summary,
  description,
  start_date,
  end_date,
  credit = false,
  featuredimage,
  logo,
  exhibitions,
}) => {
  const sDate = new Date(start_date)
  const sYear = sDate.getFullYear()
  const sMonth = sDate.getMonth()
  const sDay = sDate.getDate()
  const eDate = new Date(end_date)
  const eYear = eDate.getFullYear()
  const eMonth = eDate.getMonth()
  const eDay = eDate.getDate()

  return (
    <>
      <div className="hero">
        <div className="hero-body hero-body--align-bottom">
          {logo && <img className="hero-body__logo" src={logo} alt={title} />}
          <h1 className="hero-body__title">{title}</h1>
          <p className="hero-body__summary">{summary}</p>
          <Link to="#exhibitions" className="block-btn">
            View Exhibitions
          </Link>
        </div>
        <div className="hero-image">
          <img src={featuredimage} />
          {credit && <div className="hero-image__credit">{credit}</div>}
        </div>
      </div>
      {description && (
        <section className="section section--tight-mobile section--border-top">
          <div className="container">
            <div className="section">
              <div className="columns">
                <div className="column is-12" id="exhibitions">
                  <div className="page-statement">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <h1 className="separating-headline" id="exhibitions">
        EXHIB\TIONS
      </h1>
      <section className="section section--tight-mobile">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12" id="exhibitions">
                <ExhibitionsList
                  exhibitions={exhibitions}
                  overrides={{
                    publishedDate: `From ${sDay}/${sMonth}/${sYear} to ${eDay}/${eMonth}/${eYear}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ExhibitionGroupPageTemplate.propTypes = {
  exhibitions: PropTypes.array,
}
