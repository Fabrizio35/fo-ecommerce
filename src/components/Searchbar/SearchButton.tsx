import { SearchIcon } from '@/icons'

interface SearchButtonProps {
  handleSearch: () => void
}

export default function SearchButton({ handleSearch }: SearchButtonProps) {
  return (
    <button onClick={handleSearch} className="cursor-pointer">
      <SearchIcon className="size-5 text-neutral-900 hover:text-neutral-700" />
    </button>
  )
}
