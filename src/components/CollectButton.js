import React, { useState } from 'react'
import {collect, fulfillAsk, fullfillAsk, getCheapestListing, getNumTokens} from '../utils/marketplaces'

const CollectButton = function ({ objkt, tezos, userAddress }) {
  const [loading, setLoading] = useState(false)
  const [successfulCollect, setSuccessfulCollect] = useState(false)
  const [collectError, setCollectError] = useState(false)
  let btnClasses = ''
  if (loading) {
    btnClasses += ' loading'
  }
  if (!userAddress) {
    btnClasses += ' inactive'
  }

  const cheapest = getCheapestListing(objkt)

  return (
    <>
      <p className="availability">
        {getNumTokens(objkt) || 'X'}
        &thinsp;/&thinsp;{objkt.hicdex.supply} editions available
      </p>
      {cheapest ? (
        <button
          className={`block-btn collect ${btnClasses}`}
          onClick={async () => {
            setLoading(true)
            setSuccessfulCollect(false)
            setCollectError(false)
            try {
              if (cheapest.type === 'ask') {
                await fulfillAsk(tezos, cheapest)
              }
              if (cheapest.type === 'swap') {
                await collect(tezos, cheapest)
              }
              setSuccessfulCollect(true)
            } catch (error) {
              console.log(error)
              setLoading(false)
              setCollectError(true)
            } finally {
              setLoading(false)
            }
          }}
        >
          Collect for {cheapest.price / 1000000} tez
        </button>
      ) : (
        <a
          href={`https://teia.art/objkt/${objkt.objkt}`}
          disabled
          className="block-btn collect inactive"
        >
          Not available
        </a>
      )}
      {successfulCollect && (
        <p className="block-btn-message">Thank you for collecting!</p>
      )}
      {collectError && (
        <p className="block-btn-message block-btn-message--error">
          Unfortunately error has occurred. Please message us on Twitter at{' '}
          <a
            href="https://twitter.com/alterHEN"
            target="_BLANK"
            rel="noreferrer"
          >
            @alterHEN
          </a>{' '}
          so we can assist.
        </p>
      )}
    </>
  )
}

export default CollectButton
