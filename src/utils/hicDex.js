import {
  HEN_MINT_CONTRACT,
  TEIA_GRAPHQL_ENDPOINT,
  OBJKT_GRAPHQL_ENDPOINT,
} from '../constants'

const queryTokenDetailsTeia = `
  query ObjktDetails($id: bigint!) {
    token_by_pk(id: $id) {
      supply
      title
      artifact_uri
      creator_id
      mime
      swaps(
        order_by: {price: asc}, where: {status: {_eq: "0"}, amount_left: {_gt: "0"}, is_valid: {_eq: true}}) {
          id
          price
          amount_left
          contract_address
      }
    }
  }
`

const queryTokenDetailsObjkt = `
  query getTokenAsks($tokenId: String! $fa2: String!) {
    token(where: {token_id: {_eq: $tokenId}, fa_contract: {_eq: $fa2}}) {
      asks(
        order_by: {price: asc}
        where: {price: {_gt: 0}, _or: [{status: {_eq: "active"}, currency_id: {_eq: 1}, seller: {owner_operators: {token: {fa_contract: {_eq: $fa2}, token_id: {_eq: $tokenId}}, allowed: {_eq: true}}, held_tokens: {quantity: {_gt: "0"}, token: {fa_contract: {_eq: $fa2}, token_id: {_eq: $tokenId}}}}}, {contract_version: {_lt: 4}, status: {_eq: "active"}}]}
      ) {
        id
        amount
        amount_left
        price
        contract_version
      }
    }
  }
  `

export const hashToURL = (hash) => {
  return hash.replace('ipfs://', 'https://ipfs.io/ipfs/')
}

function makeHashCode(string_input) {
  var hash = 0,
    i,
    chr
  if (string_input.length === 0) return hash
  for (i = 0; i < string_input.length; i++) {
    chr = string_input.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

async function fetchGraphQL(
  operationsDoc,
  operationName,
  variables,
  endpointUrl,
  cache = 100000
) {
  // 10 seconds default cache length
  const querystring = JSON.stringify([operationsDoc, operationName, variables])
  const queryhash = makeHashCode(querystring)

  const queryresult_key = `query_${queryhash}_result`
  const querytime_key = `query_${queryhash}_time`

  let lastquery
  if (typeof window !== 'undefined') {
    lastquery = localStorage.getItem(querytime_key)
  } else {
    lastquery = null
  }

  if (lastquery && +new Date() - lastquery < cache) {
    console.log([
      'cache hit',
      queryhash,
      JSON.parse(localStorage.getItem(queryresult_key)),
    ])
    return JSON.parse(localStorage.getItem(queryresult_key))
  } else {
    console.log('cache miss')
    const result = await fetch(endpointUrl, {
      method: 'POST',
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    })
    const data = await result.json()

    if (typeof window !== 'undefined') {
      localStorage.setItem(queryresult_key, JSON.stringify(data))
      localStorage.setItem(querytime_key, +new Date())
    }
    return await data
  }
}

export async function objktInfo(id) {
  const { errors, data } = await fetchGraphQL(
    queryTokenDetailsTeia,
    'ObjktDetails',
    { id: id },
    TEIA_GRAPHQL_ENDPOINT,
    300000
  )

  if (errors) {
    console.error(errors)
  }

  return data.token_by_pk
}

export async function objktAskInfo(id) {
  if (id === undefined || id === null) return
  const { errors, data } = await fetchGraphQL(
    queryTokenDetailsObjkt,
    'getTokenAsks',
    { tokenId: id.toString(), fa2: HEN_MINT_CONTRACT },
    OBJKT_GRAPHQL_ENDPOINT,
    300000
  )

  if (errors) {
    console.error(errors)
  }

  return data.token[0]
}
