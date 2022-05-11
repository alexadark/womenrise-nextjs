import type { NextPage } from 'next'
import Head from 'next/head'
import { initializeApollo, addApolloState } from 'lib/apolloClient'
import { GET_ALL_TOKENS_QUERY, allTokensQueryVars } from 'lib/queries'
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Women Rise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <TokensList />
      </main>
    </div>
  )
}
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ALL_TOKENS_QUERY,
    variables: allTokensQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home
