export const getCheapestListing = (objkt) => {
    const swap = objkt.hicdex.swaps[0] || null
    const ask = objkt.hicdex.listings[0] || null
    if (swap && ask) {
        // TODO: replace quickfix by checking if swap is only Teia and not objkt ask
        return (swap.price < ask.price) || (swap.price === ask.price)
            ? {
                price: swap.price,
                contract: swap.contract_address,
                id: swap.id,
                type: 'swap',
            }
            : {
                price: ask.price,
                contract: ask.contract_address,
                id: ask.token_id,
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
            contract: ask.contract_address,
            id: ask.token_id,
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
        c.methods.fulfill_ask(objkt.token_id).send({
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
    const asks = objkt.hicdex.listings || []
    let swapsLen = 0, asksLen = 0
    for (const swap of swaps) {
        swapsLen += swap.amount_left
    } // teia/hen swaps
    for (const ask of asks) {
        asksLen += ask.amount_left
    } // objkt asks
    // quick fix for double swaps
    return swapsLen + asksLen > objkt.hicdex.supply? objkt.hicdex.supply : swapsLen + asksLen
}
