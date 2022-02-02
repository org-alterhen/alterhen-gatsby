import React from 'react'
import PropTypes from 'prop-types'

import { Card } from './Card'

const FeaturedCards = ({ title, cards }) => {
  return (
    <div className="featured-cards">
      <h2 className="featured-cards__title">{title}</h2>
      <div className="featured-cards__list">
        {cards.map((e, i) => (
          <Card
            key={`featured-card${i}`}
            title={e.frontmatter.title}
            artist={e.frontmatter.artist}
            publishedDate={false}
            url={e.fields.slug}
            image={e.frontmatter.featuredimage}
          />
        ))}
      </div>
    </div>
  )
}

FeaturedCards.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
}

export default FeaturedCards
