
import { useContext, useEffect }  from 'react'
import { useParams }              from 'react-router-dom';
import { ToastContainer }         from 'react-toastify';

import { CreatingImagaCarousel }  from '../../components/carousel/CreatingImagaCarousel'
import { EventContext }           from '../../context/EventContext'
import { FloatingActionButton }   from '../../components/button/Button'
import { Input }                  from '../../components/input/Input'
import { Loader }                 from '../../components/loader/Loader'
import { Text }                   from '../../components/titles/Titles'

import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';


export const CreateEventForm = () => {

  const {
    errors,
    formEvent,
    handleBlur,
    handleImageUpload,
    inputs,
    isLoading,
    onChange,
    onSumbit,
    loadEventById,
    setIsEditing,
    isEditing
  } = useContext(EventContext)


  const {id} = useParams()

  useEffect(() => {
    if (id) {
      loadEventById('events', id)
      setIsEditing({
        isEditEvent: true,
        id: id
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <Loader show={isLoading}/>
      <div className='p-5'>
        <Text type='title'>{!isEditing.isEditEvent ? 'Crea un evento': 'Modificar Evento'}</Text>
        <p className='text-secondary'>Aquí podrás crear un evento nuevo, es importante tener las imágenes con las medidas requeridas para cada formato</p>
        <hr />
        <form
          className='d-flex row-cols-3 flex-wrap justify-content-center mt-4'
          onSubmit={onSumbit}
        >
          {
            inputs.map((input, index: number) =>(
              <Input
                key=          {index}
                label=        {input.label}
                name=         {input.name}
                type=         {input.type}
                placeholder=  {input.placeholder}
                value=        {formEvent[input.name] as string}
                onChange=     {input.type === 'file' ?  handleImageUpload: onChange}
                onBlur=       {(e)=>handleBlur(e, input.name)}
                error=        {errors[input.name]}
              />
            ))
          }
        </form>
        <hr />
        <div className='w-100 d-flex row justify-content-center'>
          <div className='w-75'>
            <CreatingImagaCarousel inputs={inputs} formEvent={formEvent}/>
          </div>
        </div>
        <FloatingActionButton
          label={!isEditing.isEditEvent ? 'Guardar': 'Modificar'}
          onClick={onSumbit}
        />
        <ToastContainer />
      </div>
    </div>
  )
}
