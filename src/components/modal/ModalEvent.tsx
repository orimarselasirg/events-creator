import { NavLink }                          from 'react-router-dom';
import Button                               from 'react-bootstrap/Button';
import Modal                                from 'react-bootstrap/Modal';

import { Event }                            from "../../interfaces/event.interface";
import { formattedDate, isDateBeforeToday } from "../../utils/formatters";
import { ImagesCarousel }                   from "../carousel/ImageCarouse";
import { useModal }                         from "./useModal";

interface Props {
  show:     boolean;
  data:     Event;
  setShow: (bool: boolean) =>void
}

export const ModalEvent = ({ show, data, setShow }:Props) => {
  const {modalHandler, deleteEvent} = useModal({show, setShow})

  if (!show) return null

  return (
    <>
      <Modal show={show} onHide={modalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{data.name.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <div className="w-100">
          <ImagesCarousel elements={[data.desktopImage, data.tableImage, data.mobileImage]}/>
        </div>
        <Modal.Body>
          <div className=" column">
            <h5 className="text-secondary h5">Fecha del evento</h5>
            <span className="text-secondary">{formattedDate(data.date.toLocaleString())}</span>
          </div>
            <span className="text-secondary fs-18">{data.time}</span>
            <hr />
          <p className="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus ornare pretium. Vestibulum vitae ultricies arcu. Nunc quis dictum elit. Vestibulum sed mauris facilisis, dignissim felis sed, vulputate sapien. Fusce hendrerit elementum bibendum. Mauris ante massa, tincidunt in commodo ullamcorper, ultrices id tortor. Phasellus commodo, sapien ut sagittis malesuada, lectus dui ornare ante, a ultrices nisl ante a erat.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>deleteEvent(data.id, 'events')}>
            Borrar
          </Button>
          {
            !isDateBeforeToday(data.date.toLocaleString()) &&
            <NavLink to={`/form-banner/${data.id}`}>
              <Button variant="secondary" onClick={modalHandler}>
                Editar
              </Button>
            </NavLink>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}
