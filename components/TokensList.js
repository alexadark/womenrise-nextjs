import { useQueryTokens } from 'lib/hooks'
import Token from './Token'

const TokensList = ({ query, variables }) => {
  const { loading, error, tokens, loadingMoreTokens, loadMoreTokens } =
    useQueryTokens(query, variables)

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
      <button
        className="px-5 py-3 mt-10 text-xs font-medium uppercase transition duration-500 border-2 border-black hover:bg-black hover:text-white"
        onClick={() => loadMoreTokens()}
        disabled={loadingMoreTokens}
      >
        {loadingMoreTokens ? 'Loading...' : 'Show More'}
      </button>
    </div>
  )
}
export default TokensList
