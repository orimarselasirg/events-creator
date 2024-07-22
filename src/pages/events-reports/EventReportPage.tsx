import { useContext, useEffect, useState }    from 'react'
import IonIcon                                from '@reacticons/ionicons';
import { NavLink }                            from 'react-router-dom';

import { Event }                              from '../../interfaces/event.interface';
import { EventContext }                       from '../../context/EventContext'
import { formattedDate, isDateBeforeToday }   from '../../utils/formatters';
import { Loader }                             from '../../components/loader/Loader';
import { ModalEvent }                         from '../../components/modal/ModalEvent';
import { Text }                               from '../../components/titles/Titles'

export const EventReportPage = () => {

  const {events, isLoading, setIsLoading } = useContext(EventContext)
  const [show, setShow] = useState(false)
  const [event, setEvent] = useState<Event>()

  const openModal = (data: Event) => {
    setEvent(data),
    setShow(!show)
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() =>{
      setIsLoading(false)
    }, 500)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const columns = [
    {
      name: '#'
    },
    {
      name: 'Nombre del evento'
    },
    {
      name: 'Fecha del evento'
    },
    {
      name: 'Hora del evento'
    },
    {
      name: 'Url de compra'
    },
    {
      name: 'Estado del evento'
    },
    {
      name: 'Modificar'
    }
  ]

  return (
    <div className=' w-100 col p-5'>
      <Loader show={isLoading}/>
      <Text type='title'>Reporte de Eventos</Text>
      <p className='text-secondary'>Aquí podrás ver un listado de todos eventos, datos generales y su estado, también podrás editar</p>
      <hr />
      <table className="table">
        <thead>
          <tr>
            {
              columns.map((column, index: number) => (
                <th className="col" key={index}>{column.name}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            events?.map((event, index) => (
              <tr key={index} onClick={()=>openModal(event)} style={{cursor: 'pointer'}}>
                <th className="row">{index + 1}</th>
                <td>{event.name}</td>
                <td>{formattedDate(event.date.toLocaleString())}</td>
                <td>{event.time}</td>
                <td>
                  <a href={event.url} target='_blank'>
                    Verficar Url
                  </a>
                </td>
                <td>
                  <span className={
                    !isDateBeforeToday(event.date.toLocaleString()) 
                    ? 'text-bg-primary p-1 rounded' 
                    : 'text-bg-secondary p-1 rounded'
                    }
                  >
                    {!isDateBeforeToday(event.date.toLocaleString()) ? 'Vigente': 'Pasado'}
                  </span>
                </td>
                <td>
                  {
                    !isDateBeforeToday(event.date.toLocaleString()) &&
                    <NavLink to={`/form-banner/${event.id}`}>
                      <IonIcon
                        name='create-outline'
                        size={'large'}
                      />
                    </NavLink>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <ModalEvent
        show={show}
        setShow={setShow}
        data={event!}
      />
    </div>
  )
}
