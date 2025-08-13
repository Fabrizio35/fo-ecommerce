import { useSearchStore } from '@/store/searchStore'
import SearchElement from './SearchElement'
import ClearSearchesButton from './ClearSearchesButton'

interface SearchDropdownProps {
  handleSearch: (searchTerm?: string, fromClick?: boolean) => void
}

export default function SearchDropdown({ handleSearch }: SearchDropdownProps) {
  const { recentSearches } = useSearchStore((state) => state)

  return (
    <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-md z-50 max-h-60 overflow-y-auto">
      <ClearSearchesButton />
      {recentSearches.map((item, index) => (
        <SearchElement key={index} item={item} handleSearch={handleSearch} />
      ))}
    </ul>
  )
}
