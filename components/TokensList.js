import { useQueryTokens } from 'lib/hooks'
import Token from './Token'

const TokensList = ({ query, variables, ...props }) => {
  const { loading, error, tokens, loadingMoreTokens, loadMoreTokens } =
    useQueryTokens(query, variables)

  if (error) return <div>"Error loading Tokens"</div>
  if (loading && !loadingMoreTokens) return <div>Loading...</div>

  return (
    <div {...props}>
      <div className="grid grid-cols-3 gap-10">
        {tokens.map((token) => {
          const { name, tokenID, image } = token
          return <Token key={tokenID} id={tokenID} image={image} name={name} />
        })}
      </div>
      <button
        className="btn"
        onClick={() => loadMoreTokens()}
        disabled={loadingMoreTokens}
      >
        {loadingMoreTokens ? 'Loading...' : 'Show More'}
      </button>
    </div>
  )
}
export default TokensList
