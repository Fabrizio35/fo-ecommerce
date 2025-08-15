import LogoImage from '@/assets/images/logo.png'

export default function Logo() {
  return (
    <div className="select-none">
      <img src={LogoImage} alt="FO Ecommerce Logo" className="w-20 mb-2.5" />
    </div>
  )
}
