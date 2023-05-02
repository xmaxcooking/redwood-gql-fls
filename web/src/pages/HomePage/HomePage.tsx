import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>There will be a link shown below here if you're logged in:</p>
      <p>
        {isAuthenticated && (
          <Link to={routes.posts()} className="py-2 px-4">
            Go to Posts
          </Link>
        )}
        {!isAuthenticated && <span>You're not logged in.</span>}
      </p>
    </>
  )
}

export default HomePage
