import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apolloClient'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Head>
          <title>Women Rise</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="w-full py-5 bg-slate-100">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold uppercase ">
              <Link href="/">
                <a>Women Rise</a>
              </Link>
            </h1>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
          <Component {...pageProps} />
        </main>
      </div>
    </ApolloProvider>
  )
}

export default MyApp
