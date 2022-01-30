import React from 'react'

const CollectButton = function ({ objkt, contract, userAddress }) {
  return (
    <>
      <p className="availability">
        {objkt.hicdex.swaps_aggregate.aggregate.sum.amount_left || 'X'}
        &thinsp;/&thinsp;{objkt.hicdex.supply} editions available
      </p>
      {objkt.hicdex.swaps && objkt.hicdex.swaps.length > 0 ? (
        <button
          className={
            userAddress ? 'block-btn collect' : 'block-btn collect inactive'
          }
          onClick={async () => {
            // setLoadingIncrement(true);
            try {
              const op = await contract.methods
                .collect(objkt.hicdex.swaps[0].id)
                .send({
                  amount: objkt.hicdex.swaps[0].price, // parseFloat(objkt.price)
                  mutez: true,
                  storageLimit: 310,
                })
              await op.confirmation()
            } catch (error) {
              console.log(error)
            } finally {
              // setLoadingIncrement(false);
            }
          }}
        >
          Collect for {objkt.hicdex.swaps[0].price / 1000000} tez
        </button>
      ) : (
        <a
          href={`https://hicetnunc.xyz/objkt/${objkt.objkt}`}
          disabled
          className="block-btn collect inactive"
        >
          Not available
        </a>
      )}
    </>
  )
}

export default CollectButton
