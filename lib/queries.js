import { gql } from '@apollo/client'
const TokenFragment = gql`
  fragment TokenFragment on Token {
    name
    tokenID
    image
  }
`

const GET_ALL_TOKENS_QUERY = gql`
  query ($skip: Int, $first: Int) {
    tokens(first: $first, skip: $skip, orderBy: tokenID) {
      ...TokenFragment
    }
  }
  ${TokenFragment}
`
const tokensQueryVars = {
  skip: 0,
  first: 12,
}

const SEARCH_TOKENS_QUERY = gql`
  query ($text: String) {
    womenSearch(text: $text) {
      name
      image
      tokenID
    }
  }
`

const FILTER_BACKGROUND_QUERY = gql`
  query ($skip: Int, $first: Int, $filter: String) {
    tokens(
      first: $first
      skip: $skip
      orderBy: tokenID
      where: { background_contains_nocase: $filter }
    ) {
      ...TokenFragment
      background
    }
  }
  ${TokenFragment}
`
const FILTER_ACCESSORIES_QUERY = gql`
  query ($skip: Int, $first: Int, $filter: String) {
    tokens(
      first: $first
      skip: $skip
      orderBy: tokenID
      where: { accessories_contains_nocase: $filter }
    ) {
      ...TokenFragment
      accessories
    }
  }
  ${TokenFragment}
`
const FILTER_CLOTHES_QUERY = gql`
  query ($skip: Int, $first: Int, $filter: String) {
    tokens(
      first: $first
      skip: $skip
      orderBy: tokenID
      where: { clothes_contains_nocase: $filter }
    ) {
      ...TokenFragment
      clothes
    }
  }
  ${TokenFragment}
`

const FILTER_EYES_QUERY = gql`
  query ($skip: Int, $first: Int, $filter: String) {
    tokens(
      first: $first
      skip: $skip
      orderBy: tokenID
      where: { eyes_contains_nocase: $filter }
    ) {
      ...TokenFragment
      eyes
    }
  }
  ${TokenFragment}
`
const FILTER_HAIR_QUERY = gql`
  query ($skip: Int, $first: Int, $filter: String) {
    tokens(
      first: $first
      skip: $skip
      orderBy: tokenID
      where: { hair_contains_nocase: $filter }
    ) {
      ...TokenFragment
      hair
    }
  }
  ${TokenFragment}
`
export {
  GET_ALL_TOKENS_QUERY,
  SEARCH_TOKENS_QUERY,
  FILTER_HAIR_QUERY,
  FILTER_EYES_QUERY,
  FILTER_CLOTHES_QUERY,
  FILTER_ACCESSORIES_QUERY,
  FILTER_BACKGROUND_QUERY,
  tokensQueryVars,
}
