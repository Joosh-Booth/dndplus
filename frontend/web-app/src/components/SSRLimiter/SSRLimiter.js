
// This allows you to define what the server renders, useful for pages that require authentication for certain parts. See NavBar and Auth wrapper

const SSRLimiter = ({ client = <div />, server = <div /> }) => {
  const isServer = typeof window === 'undefined'
  return (
    isServer ? server : client
  )
}

export default SSRLimiter
