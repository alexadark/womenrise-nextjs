import { gql } from '@apollo/client'
const GET_ALL_TOKENS_QUERY = gql`
  query ($skip: Int, $first: Int) {
    tokens(first: $first, skip: $skip, orderBy: tokenID) {
      name
      tokenID
      image
    }
  }
`
const allTokensQueryVars = {
  skip: 0,
  first: 12,
}
export { GET_ALL_TOKENS_QUERY, allTokensQueryVars }
