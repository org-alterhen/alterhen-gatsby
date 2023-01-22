import { OBJKT_SWAP_CONTRACT_V1, OBJKT_SWAP_CONTRACT_V4 } from '../constants'

export const getCheapestListing = (objkt) => {
  const swap = objkt.hicdex.swaps[0] || null
  const ask = objkt.hicdex.asks[0] || null
  let contract = ''
  if (ask) {
    contract =
      ask.contract_version === 1
        ? OBJKT_SWAP_CONTRACT_V1
        : OBJKT_SWAP_CONTRACT_V4
  }

  if (swap && ask) {
    return swap.price < ask.price
      ? {
          price: swap.price,
          contract: swap.contract_address,
          id: swap.id,
          type: 'swap',
        }
      : {
          price: ask.price,
          contract: contract,
          id: ask.id,
          type: 'ask',
        }
  }
  if (swap && !ask) {
    return {
      price: swap.price,
      contract: swap.contract_address,
      id: swap.id,
      type: 'swap',
    }
  }
  if (!swap && ask) {
    return {
      price: ask.price,
      contract: contract,
      id: ask.id,
      type: 'ask',
    }
  }
}

export const collect = async (tezos, objkt) => {
  const op = await tezos.wallet.at(objkt.contract).then((contract) =>
    contract.methods.collect(objkt.id).send({
      amount: objkt.price,
      mutez: true,
      storageLimit: 310,
    })
  )
  await op.confirmation()
  return op
}

export const fulfillAsk = async (tezos, objkt) => {
  const op = await tezos.wallet.at(objkt.contract).then((c) =>
    c.methods.fulfill_ask(objkt.id).send({
      amount: objkt.price,
      mutez: true,
      storageLimit: 350,
    })
  )
  await op.confirmation()
  return op
}

export const getNumTokens = (objkt) => {
  const swaps = objkt.hicdex.swaps || []
  let swapsLen = 0
  for (const swap of swaps) {
    swapsLen += swap.amount_left
  } // teia/hen swaps
  const asksLen = objkt.hicdex.asks?.length || 0 // objkt asks
  return swapsLen + asksLen
}
