import { XIcon } from '@/icons'

interface CloseButtonProps {
  onClose: () => void
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      type="button"
      className="absolute top-1 right-2 cursor-pointer text-neutral-900"
      onClick={onClose}
    >
      <XIcon className="size-7" />
    </button>
  )
}
