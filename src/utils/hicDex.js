/*const queryObjktDetails = `
  query ObjktDetails($token: bigint!) {
    hic_et_nunc_token_by_pk(id: $token) {
      supply
      title
      artifact_uri
      creator_id
      mime
      swaps(limit: 1, order_by: {price: asc}, where: {status: {_eq: "0"}, amount_left: {_gt: "0"}, contract_version: {_eq: "2"}, is_valid: {_eq: true}}) {
        id
        price
      }
      swaps_aggregate(where: {is_valid: {_eq: true}, contract_version: {_eq: "2"}, status: {_eq: "0"}}) {
        aggregate {
          sum {
            amount_left
          }
        }
      }
    }
  }
`*/

const queryObjktDetails = `
  query ObjktDetails($token: bigint!) {
    token_by_pk(id: $token) {
      artifact_uri
      title
      supply
      mime
      swaps(order_by: {timestamp: desc}) {
        amount_left
        id
        price
        contract_address
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
    const result = await fetch('https://api.teia.rocks/v1/graphql', {
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

/*export async function objktInfo(id) {
  const { errors, data } = await fetchGraphQL(
    queryObjktDetails,
    'ObjktDetails',
    { token: id },
    300000
  )

  if (errors) {
    console.error(errors)
  }

  // return data.hic_et_nunc_token_by_pk
  return data.token_by_pk
}*/

export async function objktInfo(id) {
  const { errors, data } = await fetchGraphQL(
    queryObjktDetails,
    'ObjktDetails',
    { token: id },
    300000
  )

  if (errors) {
    console.error(errors)
  }

  // return data.hic_et_nunc_token_by_pk
  return data.token_by_pk
}
