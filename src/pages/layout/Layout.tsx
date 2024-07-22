import { Outlet }           from 'react-router-dom'

import { Menuoption }       from '../../interfaces/menuoption.interface'
import { Sidebar }          from '../../components/sidebar/Sidebar'
import { EventProvider }    from '../../context/EventContext'
import { FooterComponent }  from '../../components/footer/FooterComponent'
import { GithubComponent }  from '../../components/github/GitHubComponent'


const menuoption: Menuoption[] = [
  {
    name: 'Crear Evento',
    path: '/form-banner',
    icon: 'create-outline'
  },
  {
    name: 'Listado de Eventos',
    path: '/dashboard',
    icon: 'list-circle-outline'
  },
  {
    name: 'Reporte de Eventos',
    path: '/events-report',
    icon: 'file-tray-full-outline'
  },
]

export const Layout = () => {
  return (
    <EventProvider>
      <div 
        className='d-flex col' 
        style={{height: '100vh', width: '100vw'}}
      >
        <Sidebar menuoptions={menuoption}/>
        <GithubComponent text='Ver Codigo' url='https://github.com/orimarselasirg/events-creator'/>
        <div className='w-100 d-flex justify-content-around flex-column'>
          <Outlet />
          <FooterComponent text='Design By Rami'/>
        </div>
      </div>
    </EventProvider>
  )
}
