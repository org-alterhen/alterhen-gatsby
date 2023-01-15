import { TEIA_GRAPHQL_ENDPOINT } from '../constants'
import { OBJKT_GRAPHQL_ENDPOINT } from '../constants'

// const queryTokenDetailsTeia = `
//   query ObjktDetails($token: bigint!) {
//     token_by_pk(id: $token) {
//       supply
//       title
//       artifact_uri
//       creator_id
//       mime
//       swaps(limit: 1, order_by: {price: asc}, where: {status: {_eq: "0"}, amount_left: {_gt: "0"}, contract_version: {_eq: "2"}, is_valid: {_eq: true}}) {
//         id
//         price
//       }
//       swaps_aggregate(where: {is_valid: {_eq: true}, contract_version: {_eq: "2"}, status: {_eq: "0"}}) {
//         aggregate {
//           sum {
//             amount_left
//           }
//         }
//       }
//     }
//   }
// `

const queryTokenDetailsTeia = `
  query ObjktDetails($id: bigint!) {
    token_by_pk(id: $id) {
      supply
      title
      artifact_uri
      creator_id
      mime
      swaps(limit: 1, order_by: {price: asc}, where: {status: {_eq: "0"}, amount_left: {_gt: "0"}, is_valid: {_eq: true}}) {
        id
        price
        amount_left
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

  console.log(data)

  return data.token_by_pk
}
