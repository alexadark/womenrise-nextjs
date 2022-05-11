import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_ALL_TOKENS_QUERY, allTokensQueryVars } from 'lib/queries'
import Token from './Token'

const TokensList = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_ALL_TOKENS_QUERY,
    {
      variables: allTokensQueryVars,
      //Component will rerender when the "network status" changes. so we are able to know if it is fetching more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMoreTokens = networkStatus === NetworkStatus.fetchMore
  const { tokens } = data || {}

  const loadMoreTokens = () => {
    fetchMore({
      variables: {
        skip: data.tokens.length,
      },
    })
  }

  if (error) return <div>"Error loading Tokens"</div>
  if (loading && !loadingMoreTokens) return <div>Loading...</div>

  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {tokens.map((token) => {
          const { name, tokenID, image } = token
          return <Token key={tokenID} id={tokenID} image={image} name={name} />
        })}
      </div>
      <button onClick={() => loadMoreTokens()} disabled={loadingMoreTokens}>
        {loadingMoreTokens ? 'Loading...' : 'Show More'}
      </button>
    </div>
  )
}
export default TokensList
