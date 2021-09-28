const queryObjktDetails = `
  query ObjktDetails($token: bigint!) {
    hic_et_nunc_token_by_pk(id: $token) {
      supply
      title
      swaps(
        limit: 1,
        where: {amount_left: {_gt: "0"}, contract_version: {_eq: "2"}, is_valid: {_eq: true}},
        order_by: {price: asc}
    ) {
        id
        price
        amount
        amount_left
      }
    }
  }  
`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://api.hicdex.com/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

export async function objktInfo(id) {
    const { errors, data } = await fetchGraphQL(queryObjktDetails, "ObjktDetails", {"token": id});
    if (errors) {
      console.error(errors);
    }
    const result = data.hic_et_nunc_token_by_pk
    console.log({ result })
    return result    
}