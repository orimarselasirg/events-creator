import { useContext }         from 'react'
import { confirmationAlert }  from '../../utils/deletionconfirm'
import { EventContext }       from '../../context/EventContext'

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
      title:              '¿Está seguro?',
      text:               'Estás a punto de borrar un evento, esta acción no podrá deshacerse',
      confirmButtonText:  'Sí, estoy seguro',
      resultsTitle:       'Atención',
      resultText:         'Evento borrado con éxito',
      iconAlert:          'warning',
      iconSucess:         'success',
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
