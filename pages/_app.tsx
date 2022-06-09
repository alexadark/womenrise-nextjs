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
      <div className=" flex min-h-screen  flex-col items-center justify-center">
        <Head>
          <title>Women Rise</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="w-full bg-slate-100 py-5">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold uppercase ">
              <Link href="/">
                <a>Women Rise</a>
              </Link>
            </h1>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-20 text-center">
          <Component {...pageProps} />
        </main>
      </div>
    </ApolloProvider>
  )
}

export default MyApp
