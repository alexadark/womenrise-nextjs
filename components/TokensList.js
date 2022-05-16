import Token from './Token'

const TokensList = ({
  loading,
  error,
  tokens,
  loadingMoreTokens,
  loadMoreTokens,
  ...props
}) => {
  if (error) return <div>Error</div>
  if (loading && !loadingMoreTokens) return <div>Loading...</div>

  return (
    <div {...props}>
      <div className="grid grid-cols-3 gap-10">
        {tokens?.map((token) => {
          const { name, id, image } = token
          return <Token key={id} id={id} image={image} name={name} />
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
