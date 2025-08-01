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
      Ver todos
    </button>
  )
}
