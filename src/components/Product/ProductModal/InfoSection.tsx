interface InfoSectionProps {
  icon: React.ReactNode
  label: string
  value: string
}

export default function InfoSection({ icon, label, value }: InfoSectionProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}

      <span className="text-neutral-800">{label}:</span>

      <span className="text-neutral-800 font-semibold">
        {value}
        {label === 'Peso'
          ? 'g'
          : label === 'Ancho' || label === 'Alto' || label === 'Profundidad'
          ? 'cm'
          : null}
      </span>
    </div>
  )
}
