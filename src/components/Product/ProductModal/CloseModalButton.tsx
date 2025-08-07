import { XIcon } from '@/icons'

interface CloseModalButtonProps {
  handleClose: () => void
}

export default function CloseModalButton({
  handleClose,
}: CloseModalButtonProps) {
  return (
    <button
      type="button"
      className="absolute top-1 right-1 cursor-pointer text-neutral-900"
      onClick={handleClose}
    >
      <XIcon className="size-6" />
    </button>
  )
}
