import { XIcon } from '@/icons'
import { useSearchStore } from '@/store/searchStore'

interface SearchElementProps {
  handleSearch: (searchTerm?: string, fromClick?: boolean) => void
  item: string
}

export default function SearchElement({
  handleSearch,
  item,
}: SearchElementProps) {
  const { removeSearch } = useSearchStore((state) => state)

  return (
    <li
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
  )
}
