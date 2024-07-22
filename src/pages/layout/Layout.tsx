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
    path: '/',
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
        <GithubComponent text='Ver Código' url='https://github.com/orimarselasirg/events-creator'/>
        <div className='w-100 d-flex justify-content-around flex-column'>
          {/* <div className='align-self-center'>
            <h1 className='text-center'>Event Generator Application</h1>
            <p> Bienvenido a nuestra aplicación, donde podrás gestionar la creación de tus eventos y realizar un seguimiento detallado.</p>
          </div> */}
          <Outlet />
          <FooterComponent text='Design By Rami'/>
        </div>
      </div>
    </EventProvider>
  )
}
