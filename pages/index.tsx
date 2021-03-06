import { useState } from 'react'
import type { NextPage } from 'next'

import { initializeApollo, addApolloState } from 'lib/apolloClient'
import {
  GET_ALL_TOKENS_QUERY,
  SEARCH_TOKENS_QUERY,
  tokensQueryVars,
  filtersQueryVars,
} from 'lib/queries'

import TokensList from 'components/TokensList'
import { useQueryTokens } from 'lib/hooks'

const Home: NextPage = () => {
  const [filters, setFilters] = useState({
    ...filtersQueryVars,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [queryVars, setQueryVars] = useState<any>({
    ...tokensQueryVars,
    ...filters,
  })
  const [query, setQuery] = useState<any>(GET_ALL_TOKENS_QUERY)
  const { loading, error, tokens, loadingMoreTokens, loadMoreTokens, refetch } =
    useQueryTokens(query, queryVars)
  console.log(tokensQueryVars)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch({
      ...tokensQueryVars,
      ...filters,
    })
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setQuery(SEARCH_TOKENS_QUERY)
          setQueryVars({
            ...queryVars,
            text: searchQuery,
          })
          refetch()
        }}
        className="my-10 flex gap-3 "
      >
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input type="submit" value="search" className="btn !mt-0" />
      </form>
      <div className="grid gap-10 md:grid-cols-5">
        <div className="col-span-1">
          <h3>Filters</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="background"
              value={filters.background}
              onChange={(e) =>
                setFilters({ ...filters, background: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="accessories"
              value={filters.accessories}
              onChange={(e) =>
                setFilters({ ...filters, accessories: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="clothes"
              value={filters.clothes}
              onChange={(e) =>
                setFilters({ ...filters, clothes: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="hair"
              value={filters.hair}
              onChange={(e) => setFilters({ ...filters, hair: e.target.value })}
            />
            <input
              type="text"
              placeholder="eyes"
              value={filters.eyes}
              onChange={(e) => setFilters({ ...filters, eyes: e.target.value })}
            />
            <input
              type="text"
              placeholder="lips"
              value={filters.lips}
              onChange={(e) => setFilters({ ...filters, lips: e.target.value })}
            />
            <input type="submit" value="submit" className="btn" />
          </form>
        </div>
        <TokensList
          loading={loading}
          error={error}
          tokens={tokens}
          loadingMoreTokens={loadingMoreTokens}
          loadMoreTokens={loadMoreTokens}
          className="col-span-4"
        />
      </div>
    </>
  )
}
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ALL_TOKENS_QUERY,
    variables: {
      ...tokensQueryVars,
      ...filtersQueryVars,
    },
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home
