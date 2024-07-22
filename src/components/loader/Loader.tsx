import style from './loader.module.css'

interface Props {
  show: boolean;
}

export const Loader = ({show}: Props) => {

  if (!show) return null

  return (
    <div className={style.loader_overlay}>
      <div className="d-flex justify-content-center" style={{position: 'absolute', bottom: '50%', left: '50%'}}>
        <div className="spinner-border spinner-border-xl" style={{width: '4rem', height: '4rem'}} role="status">
        </div>
      </div>
    </div>
  )
}
