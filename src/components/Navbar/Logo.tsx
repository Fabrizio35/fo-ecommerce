import LogoImage from '@/assets/images/logo.png'

export default function Logo() {
  return (
    <div className="select-none">
      <img src={LogoImage} alt="FO Ecommerce Logo" className='w-[100px]' />
    </div>
  )
}
