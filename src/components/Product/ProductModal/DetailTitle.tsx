interface DetailTitleProps {
  icon: React.ReactNode
  title: string
}

export default function DetailTitle({ icon, title }: DetailTitleProps) {
  return (
    <div className="flex items-center gap-1 text-neutral-900">
      {icon}

      <h4 className="font-semibold">{title}</h4>
    </div>
  )
}
