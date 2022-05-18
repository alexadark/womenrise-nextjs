import React from 'react'
import { initializeApollo, addApolloState } from 'lib/apolloClient'
import { TOKEN_QUERY, TOKEN_PATHS } from 'lib/queries'

const TokenPage = ({ token }) => {
  const { name } = token || {}
  return <div>{name}</div>
}

export default TokenPage

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: TOKEN_QUERY,
    variables: { id: params.id },
  })

  return addApolloState(apolloClient, {
    props: {
      token: data.token,
    },
  })
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: TOKEN_PATHS,
  })

  return {
    paths: data.tokens?.map((token) => `/token/${token.id}`) || [],
    fallback: 'blocking',
  }
}
