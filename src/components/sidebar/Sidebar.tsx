import { Menuoption }           from '../../interfaces/menuoption.interface'
import { MenuOptionComponent }  from '../menuoptions/Menuoption'
import logo from '../../assets/logo-boletia-b.webp'

interface Props {
  menuoptions: Menuoption[]
}

export const Sidebar = ({menuoptions}: Props) => {
  return (
    <div 
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" 
      style={{width: '230px'}}
    >
      <h4 className='h2 fw-bold'>Event Generator App</h4>
      <hr />
      <MenuOptionComponent menuOptions={menuoptions}/>
      <div style={{position: 'relative', height: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
        <hr />
        <img src={logo} alt="" width={40} height={40} />
      </div>
    </div>
  )
}
