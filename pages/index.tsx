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
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Women Rise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <TokensList />
      </main>
    </div>
  )
}
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ALL_TOKENS_QUERY,
    variables: tokensQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home
