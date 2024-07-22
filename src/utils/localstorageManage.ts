import { Event }          from "../interfaces/event.interface";
import { FormEventModel } from "../interfaces/eventmodel.interface";

export const saveToLocalstorage = (key: string, data: FormEventModel): void => {
  try {
    const dataSaved = localStorage.getItem(key);
    
    const arrayExist: FormEventModel[] = dataSaved ? JSON.parse(dataSaved) : []

    arrayExist.push(data)

    const serializedData = JSON.stringify(arrayExist)

    localStorage.setItem(key, serializedData);

  } catch (error) {
    
    console.error('Hubo un error en el guardado', error)
  }
}

export const loadFromLocalstorage = <T>(key: string): T | null => {
  try {
    const dataSerialized = localStorage.getItem(key)

    if (!dataSerialized) return null

    return JSON.parse(dataSerialized) as T

  } catch (error) {
    
    console.error('Hubo un error en el carga del la data', error);
    
    return null
  }
}

export const loadOneLocalstorage = (key: string, id: string) => {
  try {
    const dataSerialized = localStorage.getItem(key)

    if (!dataSerialized) return null

    const events = JSON.parse(dataSerialized)

    const eventFound = events.find((event: Event) => event.id === id)

    console.log({eventFound});

    return eventFound as FormEventModel

  } catch (error) {
    
    console.error('Hubo un error en el carga del la data', error);
    
    return null
  }
}

export const deleteFromLocalstorage =(id: string, key: string): void | null => {
  try {
    const dataSerialized = localStorage.getItem(key)

    if (!dataSerialized) return null
    
    const events = JSON.parse(dataSerialized)
    
    const updateEvents = events.filter((event: Event) => event.id !== id)
    
    localStorage.setItem(key, JSON.stringify(updateEvents))

  } catch (error) {

    console.error('Hubo un error en la elminiacion del evento', error)

  }

}

export const updateFromLocalStorage = (id: string, key: string, data: FormEventModel) => {

  try {
    const dataSerialized = localStorage.getItem(key)
    if(!dataSerialized) return null

    const events = JSON.parse(dataSerialized)
    const eventIndex = events.findIndex((event: Event) => event.id === id)
    events[eventIndex] = data
    localStorage.setItem(key, JSON.stringify(events))

  } catch (error) {
    console.error('Hubo un error al editar el evento', error)
  }
}