import React from 'react'
import { initializeApollo, addApolloState } from 'lib/apolloClient'
import { TOKEN_QUERY, TOKEN_PATHS } from 'lib/queries'
import Image from 'next/image'

const TokenPage = ({ token }) => {
  const { name, accessories, image, background, clothes, eyes, hair, lips } =
    token || {}
  console.log(token)
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <Image src={image} width={500} height={500} alt={name} />
        <h3>{name}</h3>
      </div>
      <div>
        <h2 className="text-xl font-bold uppercase">Attributes</h2>
        <ul className="text-left">
          {background && <li>Background: {background}</li>}
          {accessories && <li>Accessories: {accessories}</li>}
          {clothes && <li>Clothes: {clothes}</li>}
          {eyes && <li>Eyes: {eyes}</li>}
          {hair && <li>Hair: {hair}</li>}
          {lips && <li>Lips: {lips}</li>}
        </ul>
      </div>
    </div>
  )
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
