import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { initializeApollo, addApolloState } from 'lib/apolloClient'
import { GET_ALL_TOKENS_QUERY, tokensQueryVars } from 'lib/queries'

import TokensList from 'components/TokensList'

type token = {
  id: string
  name: string
  description: string
  image: string
}

type homeType = {
  Home: NextPage
  tokens: token[]
}

const Home = () => {
  const [filters, setFilters] = useState({
    background: '',
    accessories: '',
    clothes: '',
    hair: '',
    eyes: '',
    lips: '',
  })
  const queryVars = {
    ...tokensQueryVars,
    ...filters,
  }
  console.log(filters)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Women Rise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-1">
            <h3>Filters</h3>
            <form className="space-y-5">
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
              <input type="submit" value="submit" className="btn" />
            </form>
          </div>
          <TokensList
            query={GET_ALL_TOKENS_QUERY}
            variables={queryVars}
            className="col-span-4"
          />
        </div>
      </main>
    </div>
  )
}
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ALL_TOKENS_QUERY,
    variables: {
      ...tokensQueryVars,
      background: '',
      accessories: '',
      clothes: '',
      hair: '',
      eyes: '',
      lips: '',
    },
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home
