import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import ArrowBack from './ArrowBack'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import ClearButton from './ClearButton'
import { useSearchStore } from '@/store/searchStore'
import SearchDropdown from './SearchDropdown/SearchDropdown'

export default function Searchbar() {
  const { addSearch, recentSearches } = useSearchStore((state) => state)

  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const hasSearch = searchParams.has('search')

  const [query, setQuery] = useState<string>(
    () => searchParams.get('search') ?? ''
  )
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleSearch = (searchTerm?: string, fromClick = false) => {
    const term = (searchTerm ?? query).trim()

    if (term) {
      addSearch(term)
      navigate(`/?search=${encodeURIComponent(term)}`)

      if (fromClick) setIsFocused(false)
      else setIsFocused(true)
    }
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') handleSearch()
  }

  const handleClear = () => {
    setQuery('')
    navigate('/')
  }

  const handleBack = () => {
    if (hasSearch) navigate(-1)
    else navigate('/')
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setQuery(params.get('search') ?? '')
  }, [location.search])

  return (
    <div className="flex items-center gap-2">
      {hasSearch && <ArrowBack handleBack={handleBack} />}

      <div className="relative flex items-center">
        <div className="flex items-center border-2 border-neutral-500 focus-within:border-blue-500 rounded-sm px-2 py-1 transition-colors duration-300">
          <SearchInput
            handleKeyDown={handleKeyDown}
            query={query}
            setQuery={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          />

          <SearchButton handleSearch={handleSearch} />

          {hasSearch && <ClearButton handleClear={handleClear} />}
        </div>

        {isFocused && recentSearches.length > 0 && (
          <SearchDropdown handleSearch={handleSearch} />
        )}
      </div>
    </div>
  )
}
