import IonIcon        from '@reacticons/ionicons';
import { NavLink }    from 'react-router-dom'
import { Menuoption } from '../../interfaces/menuoption.interface'
import style          from './menuoption.module.css'


interface Props {
  menuOptions: Menuoption[]
}

export const MenuOptionComponent = ({menuOptions}: Props) => {

  if(menuOptions.length === 0 ) return null
  
  return (
    <ul className='navbar-nav flex-column'>
      {
        menuOptions.map((option: Menuoption, index: number) => (
          <div className={style.item} key={index}>
            <IonIcon
              name={option.icon as never}
              size={'large'}
              style={{marginRight: '8px'}}
            />
            <NavLink
              key={index}
              to={option.path}
              className='list-group-item'
            >
              {option.name}
            </NavLink>
          </div>
        ))
      }
    </ul>
  )
}
