import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { ArrowBack, SearchIcon } from '@/icons'

export default function Searchbar() {
  const [query, setQuery] = useState<string>('')

  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const hasSearch = searchParams.has('search')

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`)
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

  return (
    <div className="flex items-center gap-2">
      {hasSearch && (
        <button type="button" onClick={handleBack} className="cursor-pointer">
          <ArrowBack className="size-7 text-neutral-900" />
        </button>
      )}

      <div className="flex items-center border-2 border-neutral-500 rounded-sm px-2 py-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar producto..."
          className="outline-none text-neutral-900 px-1"
        />

        <button onClick={handleSearch} className="cursor-pointer">
          <SearchIcon className="size-5 text-neutral-900 hover:text-neutral-700" />
        </button>

        {hasSearch && (
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer text-sm ml-2 text-neutral-900 hover:underline"
          >
            Ver todos
          </button>
        )}
      </div>
    </div>
  )
}
