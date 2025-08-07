import { RefreshIcon } from '@/icons'

interface ClearButtonProps {
  handleClear: () => void
}

export default function ClearButton({ handleClear }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={handleClear}
      className="cursor-pointer text-sm ml-2 text-neutral-900 hover:underline"
    >
      <RefreshIcon className="size-5 text-neutral-900 hover:text-blue-500 transition-colors duration-300" />
    </button>
  )
}
