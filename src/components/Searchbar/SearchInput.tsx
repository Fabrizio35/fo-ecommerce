interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  query: string
  setQuery: (query: string) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function SearchInput({
  handleKeyDown,
  query,
  setQuery,
  ...rest
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Buscar producto..."
      className="outline-none text-neutral-900 px-1"
      {...rest}
    />
  )
}
