import React, { ChangeEvent, createContext, useEffect, useState } from "react";
import { useNavigate }                                            from "react-router-dom";
import { toast }                                                  from 'react-toastify';
import { v4 as uuidv4 }                                           from 'uuid';

import { 
  deleteFromLocalstorage,
  loadFromLocalstorage,
  loadOneLocalstorage,
  saveToLocalstorage,
  updateFromLocalStorage 
}                             from "../utils/localstorageManage";
import { confirmationAlert }  from "../utils/deletionconfirm";
import { Event }              from "../interfaces/event.interface";
import { FormEventModel }     from "../interfaces/eventmodel.interface";
import { IMAGE }              from "../utils/constans";
import { Inputs }             from "../interfaces/inputsmodel.interface";

type EditingEvent = {
  isEditEvent:  boolean,
  id:           string
}

type EventContextProps = {
  deleteEvent:        (id: string, key: string ) => void | null
  editEvent:          (id: string, key: string, data: FormEventModel) => void
  errors:             Record<string, string | null>
  events:             Event[] | null
  formEvent:          FormEventModel
  handleBlur:         (e:ChangeEvent<HTMLInputElement>,  name: string) => void
  handleImageUpload:  (event: ChangeEvent<HTMLInputElement>) => void
  inputs:             Inputs[]
  isLoading:          boolean
  loadEvents:         (key: string) => void
  onChange:           (event: ChangeEvent<HTMLInputElement>) => void
  onSumbit:           () => void
  saveEvent:          (key: string, data:FormEventModel) => void
  setFormEvent:       (event: FormEventModel) => void
  loadEventById:      (key: string, id: string) => void
  isEditing:          EditingEvent 
  setIsEditing:       (editEvent: EditingEvent) => void
  setIsLoading:       (bool: boolean) => void
  setFlag:            (bool: boolean) => void
  flag:               boolean
}

interface EventProviderProps {
  children: React.ReactNode;
}

const initialFormEvent: FormEventModel = {
  date:         '',
  desktopImage: '',
  id:           uuidv4(),
  mobileImage:  '',
  name:         '',
  tableImage:   '',
  time:         '',
  url:          '',
};

export const EventContext = createContext({} as EventContextProps)

export const EventProvider = ({children}: EventProviderProps) => {
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [events, setEvents] = useState<Event[] | null >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [flag, setFlag] = useState<boolean>(false)
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<EditingEvent>({
    isEditEvent: false,
    id: ''
  })
  const [formEvent, setFormEvent] = useState<FormEventModel>({
    ...initialFormEvent,
    id: uuidv4()
  })

  const inputs: Inputs[] = [
    {
      label: 'Nombre del evento',
      type: 'text',
      placeholder: 'Ingresa nombre del evento',
      name: 'name'
    },
    {
      label: 'Fecha del evento',
      type: 'date',
      placeholder: 'Ingresa la fecha del evento',
      name: 'date'
    },
    {
      label: 'Hora del evento',
      type: 'time',
      placeholder: 'Ingresa hora de inicio del evento',
      name: 'time'
    },
    {
      label: 'Url de compras',
      type: 'url',
      placeholder: 'Ingrese URL donde el usuario podrá hacer la compra',
      name: 'url'
    },
    {
      label: 'Imagen Desktop (2340 x 700 px)',
      type: 'file',
      placeholder: 'Medidas de imagen 2340 x 700 px',
      name: 'desktopImage'
    },
    {
      label: 'Imagen Tablet (1440 x 1080 px)',
      type: 'file',
      placeholder: 'Medidas imagen 1440 x 1080 px',
      name: 'tableImage'
    },
    {
      label: 'Imagen Mobile (1920 x 1080 px)',
      type: 'file',
      placeholder: 'Medida imagen 1920 x 1080 px',
      name: 'mobileImage'
    },
  ]

  useEffect(() => {
    loadEvents('events')
  }, [])

  const redirect = (path: string) => {
    navigate(path);
  }; 

  const saveEvent = (key: string, data: FormEventModel): void => {
    try {
      saveToLocalstorage(key, data)
    } catch (error) {
      console.error('Hubo un error en el guardado', error)
    }
  }

  const loadEvents = async(key: string) => {
    try {
      const eventsData = await loadFromLocalstorage<Event[]>(key)
      setEvents(eventsData)
    } catch (error) {
      console.error('Hubo un error en la carga de los eventos', error);
    }
  }
  
  const loadEventById = (key: string, id: string): void => {
    try {
      const event = loadOneLocalstorage(key, id)
      if(!event) return
      setFormEvent(event)
    } catch (error) {
      console.error('Hubo un error en la carga del evento', error);
    }
  }

  const confirmationEvent = async () => {
    try {
      const deletionApproved = await confirmationAlert({
        iconAlert:          'question',
        iconSucess:         'success',
        title:              isEditing.isEditEvent ? "¿Editar Evento?": '¿Crear Evento?' ,
        text:               `Estas a punto de ${isEditing.isEditEvent ? 'editar': 'crear'} un evento`,
        confirmButtonText:  'Continuar',
        resultsTitle:       "¡Atención!",
        resultText:         `Evento ${isEditing.isEditEvent ? 'editado': 'creado'} con exito`
      })
  
      if(deletionApproved){
        setIsLoading(!isLoading)
          setTimeout(() => {
          setFormEvent({
            ...formEvent,
            id: uuidv4()
          })
          isEditing.isEditEvent
          ? editEvent(isEditing.id, 'events', formEvent)
          : saveEvent('events', formEvent)
          setFormEvent(initialFormEvent)
          setIsLoading(false)
          setFlag(!flag)
        }, 2000);
      }
      redirect('/')
    } catch (error) {
      console.log({error});
    }
  }

  const deleteEvent = (id: string, key: string): void => {
    try {
      setIsLoading(!isLoading);
      setTimeout(() => {
        deleteFromLocalstorage(id, key)
      }, 2000);
      setEvents((previous) => previous && previous.filter(event => event.id !== id));
    } catch (error) {
      console.error('Hubo un error al borrar el evento', error)
    } finally {
      setIsLoading(false)
    }
  }

  const editEvent = (id: string, key: string, data: FormEventModel): void => {
    try {
      updateFromLocalStorage(id, key ,data)
    } catch (error) {
      console.error('Hubo un error al editar el evento', error)
    }
  }

  const fileSizeValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file                = event.target.files?.[0];
    const oneMB: number       = IMAGE.ONE_MB
    const maxSizeinKB         = IMAGE.MAX_KB

    if (file) {
      const fileSize        = file.size / oneMB
      const isFileSizeValid = fileSize < maxSizeinKB

      return !isFileSizeValid ? false : true
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file    = event.target.files?.[0];
    const {name}  = event.target

    if (file) {
      const isValid = fileSizeValidation(event)
      if (!isValid) return

      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormEvent({
          ...formEvent,
          [name] : base64String
        })
      };
      reader.readAsDataURL(file);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setFormEvent({
      ...formEvent,
      [name] : value
    })
  }

  const inputValidator = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    const isValidUrl = urlValidator(formEvent.url)
    const isEmpty = formEvent.name === ""
    const isValidDate = validateDate(formEvent.date)
    const isValidTime = validateTime(formEvent.time)

    if(name === 'name' && isEmpty) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Este campo no puede estar vacío'}))
      return
    }
    if(name === 'url' && !isValidUrl) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'URL inválida' }))
      return
    }
    if(name === 'date' && !isValidDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Fecha inválida' }))
      return
    }
    if(name === 'time' && !isValidTime) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Tiempo inválido' }))
      return
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));  

  }

  const imageDimensionValidator = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file    = event.target.files?.[0];
    const {name}  = event.target 
    if (file) {
      const reader  = new FileReader();

      reader.onload = (e) => {
        
        const img = new Image();
        img.src   = e.target?.result as string;

        img.onload = () => {
          const width           = img.width;
          const height          = img.height;
          const sizeInKB        = file.size / IMAGE.ONE_MB;
          const isFileSizeValid = sizeInKB < IMAGE.MAX_KB

          const isDesktopValidDimension = 
          width === IMAGE.MAX_DESKTOP_WIDTH
          && height === IMAGE.MAX_DESKTOP_HEIGTH
          
          const isTabletValidDimension = 
          width === IMAGE.MAX_TABLE_WIDTH
          && height === IMAGE.MAX_TABLE_HEIGTH
          
          const isMobileValidDimension =
          width === IMAGE.MAX_MOBILE_WIDTH
          && height === IMAGE.MAX_MOBILE_HEIGTH


          if(!isFileSizeValid) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: 'El archivo supera el máximo permitido' }))
            return
          }
          
          if(!isDesktopValidDimension && name === 'desktopImage') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: 'El archivo no tiene las medidas para desktop'}))
            return
          }

          if(!isTabletValidDimension && name === 'tableImage') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: 'El archivo no tiene las medidas para tablets'}))
            return
          }
          
          if(!isMobileValidDimension && name === 'mobileImage') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: 'El archivo no tiene las medidas para moviles'}))
            return
          }
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));  
        };
      };
      reader.readAsDataURL(file); 
    }
  }
  
  const onSumbit = () => {
    const isValidForm = validations()
    
    if(!isValidForm) {
      toast.error("Falta campos por completar o hay errores en el formulario");
      return
    } 
    confirmationEvent()
  }

  const emptyInputs = (): boolean => {
    return Object.values(formEvent).some((value) => value === "")
  }

  const urlValidator = (url: string): boolean=> {
    try {
       new URL(url)
       return true
    } catch (error) {
      return false
    }
  }

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date) && !isNaN(new Date(date).getTime());
  };

  const validateTime = (time: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const validations = () => {
    const errorName         = !!errors.name
    const errorDate         = !!errors.date
    const errorTime         = !!errors.time
    const errorUrl          = !!errors.url
    const errorDesktopImage = !!errors.desktopImage
    const errorTableImage   = !!errors.tableImage
    const errorMobileImage  = !!errors.mobileImage
    const isEmptyInputs     = emptyInputs()

    if(isEmptyInputs) {
      return false
    }

    if( errorName || errorDate  || 
        errorTime || errorUrl   || 
        errorDesktopImage || errorTableImage || 
        errorMobileImage) {
      return false
    }
    return true
  }

  const handleBlur = (e:ChangeEvent<HTMLInputElement>,  name: string) => {
    
    switch (name) {
      case 'name':
        inputValidator(e)
        break;
      case 'url':
        inputValidator(e)
        break;
      case 'date':
        inputValidator(e)
        break;
      case 'time':
        inputValidator(e)
        break;
      case 'desktopImage':
        imageDimensionValidator(e)
        break;
      case 'tableImage':
        imageDimensionValidator(e)
        break;
      case 'mobileImage':
        imageDimensionValidator(e)
        break;
      default:
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
    validations()
  };

  return (
    <EventContext.Provider
      value={{
        deleteEvent,
        editEvent,
        errors,
        events,
        formEvent,
        handleBlur,
        handleImageUpload,
        inputs,
        isLoading,
        loadEvents,
        onChange,
        onSumbit,
        saveEvent,
        setFormEvent,
        loadEventById,
        isEditing,
        setIsEditing,
        setIsLoading,
        flag,
        setFlag
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
