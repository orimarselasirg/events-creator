import { SwiperSlide, Swiper }  from 'swiper/react'
import { FormEventModel }       from '../../interfaces/eventmodel.interface';
import { Inputs }               from '../../interfaces/inputsmodel.interface';

import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  inputs:     Inputs[];
  formEvent:  FormEventModel
}

export const CreatingImagaCarousel = ({inputs, formEvent}: Props) => {
  return (
    <Swiper
      spaceBetween={100}
      slidesPerView={3}
      centeredSlides
      centeredSlidesBounds={true}
    >
      {
        inputs.filter(input => input.type === 'file').map((e: Inputs, index: number) => (
        <SwiperSlide
          key={index}
        >
          {formEvent[e.name] && 
            <img 
              src={formEvent[e.name] as string}
              alt={e.name} width={250} 
              className='shadow mb-4 mt-4 rounded'
            />
          }
        </SwiperSlide>

        ))
      }
    </Swiper>
  )
}
