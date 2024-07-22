import { useState }   from 'react'
import { NavLink }    from 'react-router-dom'

import { Event }      from '../../interfaces/event.interface'
import { ModalEvent } from '../modal/ModalEvent'

interface Props {
  event: Event
}

export const CardComponent = ({event}: Props) => {

  const [show, setShow] = useState<boolean>(false)

  return (
    <div className="card mt-5 mb-5 border-0 shadow" style={{width: '18rem'}}>

      <img
        src={event.desktopImage}
        className="card-img-top"
        style={{cursor: 'pointer'}}
        alt={event.name}
        width={100}
        height={200}
        onClick={() => setShow(true)}
      />
      <div className="card-body">
        <h5 className="card-title h3 fw-bold text-wrap">{event.name}</h5>
        <p className="card-text text-body-secondary">
          <strong>Fecha del evento:</strong> {event.date.toLocaleString()}
        </p>
        <p className="card-text text-body-secondary">
          <strong>Hora de inicio:</strong> {event.time}
        </p>
        <NavLink
          to={event.url}
          className="btn btn-secondary bg-dark"
        >
          Comprar Entrada
        </NavLink>
      </div>
   
      <ModalEvent
        data={event}
        show={show}
        setShow={setShow}
      />
    </div>
  )
}
