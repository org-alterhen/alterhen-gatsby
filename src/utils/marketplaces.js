export const collect = async (tezos, objkt) => {
    const op = await tezos.wallet.at(objkt.hicdex.contract_address).then((contract) =>
        contract.methods.collect(objkt.hicdex.swap_id).send({
            amount: objkt.hicdex.price,
            mutez: true,
            storageLimit: 310,
        })
    )
    await op.confirmation()
    return op
}

export const fulfillAsk = async (tezos, objkt) => {
    const op = await tezos.wallet.at(objkt.hicdex.contract_address).then((c) =>
        c.methods.fulfill_ask(objkt.hicdex.ask_id).send({
            amount: objkt.hicdex.price,
            mutez: true,
            storageLimit: 350,
        })
    )
    await op.confirmation()
    return op
}

export const getCheapestListing = (objkt) => {
    return objkt.listings ? {
        ...objkt.listings[0],
        amount_left: objkt.listings_aggregate.aggregate.sum.amount,
        editions: objkt.editions
    } : { editions: objkt.editions }
}
