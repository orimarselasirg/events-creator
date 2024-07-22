import style from './footer.module.css'


interface Props {
  text: string
}

export const FooterComponent = ({text}: Props) => {
  return (
    <div className={style.footer}>
      <div className='border-top w-100 d-flex justify-content-center'>
        <span className='mt-2 h-75 text-secondary fw-bold'>
          {text} 🤓
        </span>
      </div>
    </div>
    
  )
}
