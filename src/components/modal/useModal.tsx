import { useContext } from 'react'
import { confirmationAlert } from '../../utils/deletionconfirm'
import { EventContext } from '../../context/EventContext'

type Props = {
  show:     boolean,
  setShow:  (bool: boolean) => void,
}


export const useModal = ({
  show,
  setShow
}: Props) => {

  const {deleteEvent} = useContext(EventContext)

  const modalHandler = () => {
    setShow(!show)
  }

  const deleteEventById = async (id: string, key: string) => {
    const deletionApproved = await confirmationAlert({
      title: '¿Esta seguro?',
      text:"Estas a punto de borrar un evento, esta accion no podra deshacerce",
      confirmButtonText:'Borrar',
      resultsTitle: "Atencion",
      resultText: "Evento borrado con exito",
      iconAlert: 'warning',
      iconSucess: 'success',
    })

    if(deletionApproved){
      modalHandler()
      deleteEvent(id, key)
    }
  }
  return {
    modalHandler,
    deleteEvent: deleteEventById
  }
}
