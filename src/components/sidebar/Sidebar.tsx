import { useState }             from 'react';
import IonIcon                  from '@reacticons/ionicons';
import { Menuoption }           from '../../interfaces/menuoption.interface'
import { MenuOptionComponent }  from '../menuoptions/Menuoption'
import logo                     from '../../assets/logo-boletia-b.webp'
import style                    from './sidebar.module.css'

interface Props {
  menuoptions: Menuoption[]
}

export const Sidebar = ({menuoptions}: Props) => {
  const [change, setChange] = useState(false)

  return (
    <div 
      className={change ? style.sidebar_shrink : style.sidebar} 
      style={{width: change ? 80 : 230}}
    >
      <div className='d-flex column z-2'>
        {change ? null : <h4 className='h2 fw-bold'>Event Generator App</h4>}
        <IonIcon
          name={change ? 'arrow-forward' :'arrow-back'}
          style={{width: 50, height: 50, padding: 10, cursor: 'pointer'}}
          onClick={()=> setChange(!change)}
        />
      </div>
      <hr />
      <MenuOptionComponent menuOptions={menuoptions} change={change}/>
      <div className={`d-flex flex-column justify-content-end position-relative h-100 ${change && 'align-items-center'}`}>
        <hr />
        <img src={logo} alt="" width={40} height={40} />
      </div>
    </div>
  )
}
