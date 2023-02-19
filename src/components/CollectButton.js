import React, { useState } from 'react'
import {
  collect,
  fulfillAsk,
} from '../utils/marketplaces'
import {HEN_V2_SWAP_CONTRACT, OBJKT_SWAP_CONTRACT_V1, OBJKT_SWAP_CONTRACT_V4, TEIA_SWAP_CONTRACT} from "../constants";

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

  return (
    <>
      <p className="availability">
        {objkt.hicdex.amount_left || 'X'}
        &thinsp;/&thinsp;{objkt.hicdex.editions} editions available
      </p>
      {objkt.hicdex.amount_left ? (
        <button
          className={`block-btn collect ${btnClasses}`}
          onClick={async () => {
            setLoading(true)
            setSuccessfulCollect(false)
            setCollectError(false)
            try {
              if (objkt.hicdex.contract_address === OBJKT_SWAP_CONTRACT_V1 ||
                  objkt.hicdex.contract_address === OBJKT_SWAP_CONTRACT_V4) {
                await fulfillAsk(tezos, objkt)
              }
              if (objkt.hicdex.contract_address === TEIA_SWAP_CONTRACT ||
                  objkt.hicdex.contract_address === HEN_V2_SWAP_CONTRACT) {
                await collect(tezos, objkt)
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
          Collect for {objkt.hicdex.price / 1000000} tez
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
