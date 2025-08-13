import { useSearchStore } from '@/store/searchStore'

export default function ClearSearchesButton() {
  const { clearSearches } = useSearchStore((state) => state)

  return (
    <div className="w-full flex justify-center items-center py-0.5">
      <button
        type="button"
        onMouseDown={() => clearSearches()}
        className="text-blue-500 text-sm cursor-pointer text-center w-fit hover:underline"
      >
        Borrar historial
      </button>
    </div>
  )
}
