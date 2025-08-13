import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import ArrowBack from './ArrowBack'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import ClearButton from './ClearButton'
import { useSearchStore } from '@/store/searchStore'
import { XIcon } from '@/icons'

export default function Searchbar() {
  const { addSearch, recentSearches, clearSearches, removeSearch } =
    useSearchStore((state) => state)

  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const hasSearch = searchParams.has('search')

  const [query, setQuery] = useState<string>(
    () => searchParams.get('search') ?? ''
  )
  const [isFocused, setIsFocused] = useState<boolean>(false)

  // Function to handle search submission
  // It navigates to the search results page with the query
  const handleSearch = (searchTerm?: string, fromClick = false) => {
    const term = (searchTerm ?? query).trim()

    if (term) {
      addSearch(term)
      navigate(`/?search=${encodeURIComponent(term)}`)

      if (fromClick) setIsFocused(false)
      else setIsFocused(true)
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
          <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-md z-50 max-h-60 overflow-y-auto">
            <div className="w-full flex justify-center items-center py-0.5">
              <button
                type="button"
                onMouseDown={() => clearSearches()}
                className="text-blue-500 text-sm cursor-pointer text-center w-fit hover:underline"
              >
                Borrar historial
              </button>
            </div>
            {recentSearches.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 text-neutral-800 cursor-pointer"
                onMouseDown={() => handleSearch(item, true)}
              >
                <span>{item}</span>

                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeSearch(item)
                  }}
                  className="ml-2 cursor-pointer z-50 text-neutral-800 hover:text-red-500 transition-colors duration-200"
                  aria-label={`Eliminar búsqueda ${item}`}
                >
                  <XIcon className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
