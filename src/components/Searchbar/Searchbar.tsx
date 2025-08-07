import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import ArrowBack from './ArrowBack'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import ClearButton from './ClearButton'

export default function Searchbar() {
  const [query, setQuery] = useState<string>('')

  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const hasSearch = searchParams.has('search')

  // Function to handle search submission
  // It navigates to the search results page with the query
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`)
    }
  }

  // Function to handle keydown events
  // It triggers the search when the Enter key is pressed
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') handleSearch()
  }

  // Function to clear the search query
  // It resets the query state and navigates to the home page
  const handleClear = () => {
    setQuery('')
    navigate('/')
  }

  // Function to handle back navigation
  // It navigates back to the previous page or to the home page if no search was
  const handleBack = () => {
    if (hasSearch) navigate(-1)
    else navigate('/')
  }

  return (
    <div className="flex items-center gap-2">
      {hasSearch && <ArrowBack handleBack={handleBack} />}

      <div className="flex items-center border-2 border-neutral-500 focus-within:border-blue-500 rounded-sm px-2 py-1 transition-colors duration-300">
        <SearchInput
          handleKeyDown={handleKeyDown}
          query={query}
          setQuery={setQuery}
        />

        <SearchButton handleSearch={handleSearch} />

        {hasSearch && <ClearButton handleClear={handleClear} />}
      </div>
    </div>
  )
}
