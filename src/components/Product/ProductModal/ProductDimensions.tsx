import {
  DepthIcon,
  DimensionsIcon,
  HeightIcon,
  WeightIcon,
  WidthIcon,
} from '@/icons'
import type { Product } from '@/types/product'
import DetailTitle from './DetailTitle'
import InfoSection from './InfoSection'

interface ProductDimensionsProps {
  width: Product['dimensions']['width']
  height: Product['dimensions']['height']
  depth: Product['dimensions']['depth']
  weight: Product['weight']
}

export default function ProductDimensions({
  depth,
  height,
  weight,
  width,
}: ProductDimensionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <DetailTitle
        icon={<DimensionsIcon className="size-7" />}
        title="Dimensiones"
      />

      <div className="flex flex-col gap-2">
        <InfoSection
          icon={
            <WidthIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Ancho"
          value={String(width)}
        />

        <InfoSection
          icon={
            <HeightIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Alto"
          value={String(height)}
        />

        <InfoSection
          icon={
            <DepthIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Profundidad"
          value={String(depth)}
        />

        <InfoSection
          icon={
            <WeightIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Peso"
          value={String(weight)}
        />
      </div>
    </div>
  )
}
