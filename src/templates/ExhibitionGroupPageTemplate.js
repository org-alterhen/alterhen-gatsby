import React from 'react'
import PropTypes from 'prop-types'
import { ExhibitionsList } from '../components/ExhibitionsList'

export const ExhibitionGroupPageTemplate = ({ title, exhibitions }) => {
  return (
    <>
      <h1 className="separating-headline">EXHIB\TIONS</h1>
      <section className="section tint-pink">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-12">
                <div className="content">
                  <div className="column is-12" id="exhibitions">
                    <ExhibitionsList exhibitions={exhibitions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ExhibitionGroupPageTemplate.propTypes = {}
