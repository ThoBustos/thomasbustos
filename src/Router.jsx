import { useState, useEffect } from 'react'
import App from './App'
import Newsletter from './components/Newsletter'
import NewsletterArchive from './components/NewsletterArchive'

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // Make navigate function available globally for easy navigation
  window.navigate = navigate

  const renderCurrentPage = () => {
    if (currentPath.startsWith('/newsletter/')) {
      // Individual newsletter article
      return <Newsletter />
    }
    
    switch (currentPath) {
      case '/newsletter':
        return <NewsletterArchive />
      case '/':
      default:
        return <App />
    }
  }

  return renderCurrentPage()
}

export default Router