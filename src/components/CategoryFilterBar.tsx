import { useEffect, useState } from 'react'
import { getCategories } from '@/services/productService'
import type { ProductCategoryResponse as Category } from '@/types/category'
import { useLocation, useNavigate } from 'react-router'

export default function CategoryFilterBar() {
  const [categories, setCategories] = useState<Category[]>([])

  const navigate = useNavigate()
  const location = useLocation()

  const handleSelectCategory = (slug: string) => {
    const searchParams = new URLSearchParams(location.search)

    if (slug === 'all') searchParams.delete('category')
    else searchParams.set('category', slug)

    navigate({ search: searchParams.toString() })
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()

        if (data) setCategories(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <nav className="flex flex-wrap gap-3 px-5 py-3 bg-white shadow-sm sticky top-14 z-40">
      <button
        onClick={() => handleSelectCategory('all')}
        className="px-3 py-1 text-sm font-medium rounded-lg bg-white shadow hover:bg-gray-50"
      >
        Todos
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          onClick={() => handleSelectCategory(c.slug)}
          className="px-3 py-1 text-sm font-medium rounded-lg bg-white shadow hover:bg-gray-50"
        >
          {c.name}
        </button>
      ))}
    </nav>
  )
}
