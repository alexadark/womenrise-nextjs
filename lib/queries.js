import { gql } from '@apollo/client'
const TokenFragment = gql`
  fragment TokenFragment on Token {
    name
    id
    image
    background
    clothes
    accessories
    hair
    eyes
    lips
  }
`
const GET_ALL_TOKENS_QUERY = gql`
  query (
    $skip: Int
    $first: Int
    $accessories: String
    $background: String
    $clothes: String
    $hair: String
    $eyes: String
    $lips: String
  ) {
    tokens(
      skip: $skip
      first: $first
      orderBy: tokenID
      where: {
        accessories_contains_nocase: $accessories
        background_contains_nocase: $background
        clothes_contains_nocase: $clothes
        hair_contains_nocase: $hair
        eyes_contains_nocase: $eyes
        lips_contains_nocase: $lips
      }
    ) {
      ...TokenFragment
    }
  }
  ${TokenFragment}
`

const tokensQueryVars = {
  skip: 0,
  first: 12,
}
const filtersQueryVars = {
  background: '',
  accessories: '',
  clothes: '',
  hair: '',
  eyes: '',
  lips: '',
}

const SEARCH_TOKENS_QUERY = gql`
  query ($skip: Int, $first: Int, $text: String) {
    womenSearch(skip: $skip, first: $first, text: $text) {
      name
      image
      tokenID
    }
  }
`

const TOKEN_QUERY = gql`
  query ($id: ID!) {
    token(id: $id) {
      ...TokenFragment
    }
  }
  ${TokenFragment}
`

const TOKEN_PATHS = gql`
  query {
    tokens(first: 1) {
      id
    }
  }
`

export {
  GET_ALL_TOKENS_QUERY,
  SEARCH_TOKENS_QUERY,
  TOKEN_QUERY,
  TOKEN_PATHS,
  tokensQueryVars,
  filtersQueryVars,
}
