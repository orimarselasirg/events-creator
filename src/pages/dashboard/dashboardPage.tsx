import { useContext, useEffect }          from 'react';

import { CarouselComponent }              from '../../components/carousel/CarouselComponent';
import { EventContext }                   from '../../context/EventContext';
import { Loader }                         from '../../components/loader/Loader';
import { Text }                           from '../../components/titles/Titles';

export const DashboardPage = () => {

  const {events, isLoading, loadEvents, flag} = useContext(EventContext)

  useEffect(()=> {
    loadEvents('events')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[flag])

  

  return (
    <div className=' w-100 col p-5'>
      <Loader show={isLoading}/>
      <Text type='title'>Listado de eventos</Text>
      <p className='text-secondary'>Aqui podras encontrar todos los eventos que hayas creados previamente, ver los detalles, editar o borrar</p>
      <hr />
      <div style={{width: '85%'}}>
        <CarouselComponent events={events}/> 
      </div>
    </div>
  )
}
