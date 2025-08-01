import { ArrowBackIcon } from '@/icons'

interface ArrowBackProps {
  handleBack: () => void
}

export default function ArrowBack({ handleBack }: ArrowBackProps) {
  return (
    <button type="button" onClick={handleBack} className="cursor-pointer">
      <ArrowBackIcon className="size-7 text-neutral-900" />
    </button>
  )
}
