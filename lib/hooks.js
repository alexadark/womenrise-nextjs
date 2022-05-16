import { useQuery, NetworkStatus } from '@apollo/client'

export const useQueryTokens = (query, variables) => {
  const { loading, error, data, fetchMore, networkStatus, refetch } = useQuery(
    query,
    {
      variables: variables,
      //Component will rerender when the "network status" changes. so we are able to know if it is fetching more data
      notifyOnNetworkStatusChange: true,
    }
  )
  const loadingMoreTokens = networkStatus === NetworkStatus.fetchMore
  const { tokens } = data || {}

  const loadMoreTokens = () => {
    fetchMore({
      variables: {
        skip: tokens.length,
      },
    })
  }

  return {
    loading,
    error,
    tokens,
    loadingMoreTokens,
    loadMoreTokens,
    refetch,
  }
}
