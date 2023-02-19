import {
  HEN_MINT_CONTRACT,
  TEZTOK_GRAPHQL_ENDPOINT,
} from '../constants'

const queryTokenDetailsTezTok = `
  query ObjktDetails($fa2_address: String!, $token_id: String!) {
    tokens_by_pk(fa2_address: $fa2_address, token_id: $token_id) {
      listings(where: {status: {_eq: "active"}}, order_by: {price: asc}) {
        token_id
        amount
        amount_left
        price
        contract_address
        swap_id
        ask_id
      }
      listings_aggregate(where: {status: {_eq: "active"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
      editions
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
  if (id === undefined || id === null) return
  const { errors, data } = await fetchGraphQL(
      queryTokenDetailsTezTok,
      'ObjktDetails',
      { token_id: id.toString(), fa2_address: HEN_MINT_CONTRACT },
      TEZTOK_GRAPHQL_ENDPOINT,
      300000
  )

  if (errors) {
    console.error(errors)
  }

  return data.tokens_by_pk
}