import {
  CircleCheckIcon,
  CubeSendIcon,
  InfoCircleIcon,
  ProgressAlertIcon,
} from '@/icons'
import type { Product } from '@/types/product'
import DetailTitle from './DetailTitle'
import InfoSection from './InfoSection'

interface ProductInfoProps {
  warrantyInformation: Product['warrantyInformation']
  shippingInformation: Product['shippingInformation']
  availabilityStatus: Product['availabilityStatus']
}

export default function ProductInfo({
  availabilityStatus,
  shippingInformation,
  warrantyInformation,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <DetailTitle
        icon={<InfoCircleIcon className="size-7" />}
        title="Información"
      />

      <div className="flex flex-col gap-2">
        <InfoSection
          icon={
            <CircleCheckIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Garantía"
          value={warrantyInformation}
        />

        <InfoSection
          icon={
            <CubeSendIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Envío"
          value={shippingInformation}
        />

        <InfoSection
          icon={
            <ProgressAlertIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />
          }
          label="Estado de disponibilidad"
          value={availabilityStatus}
        />
      </div>
    </div>
  )
}
