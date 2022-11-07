import React, { useState } from 'react'

const CollectButton = function ({ objkt, contract, userAddress }) {
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
        {objkt.hicdex.swaps[0].amount_left || 'X'}
        &thinsp;/&thinsp;{objkt.hicdex.supply} editions available
      </p>
      {objkt.hicdex.swaps && objkt.hicdex.swaps.length > 0 ? (
        <button
          className={`block-btn collect ${btnClasses}`}
          onClick={async () => {
            setLoading(true)
            setSuccessfulCollect(false)
            setCollectError(false)
            try {
              const op = await contract.methods
                .collect(objkt.hicdex.swaps[0].id)
                .send({
                  amount: objkt.hicdex.swaps[0].price, // parseFloat(objkt.price)
                  mutez: true,
                  storageLimit: 310,
                })
              await op.confirmation()
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
          Collect for {objkt.hicdex.swaps[0].price / 1000000} tez
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
