
import { CardComponent }          from '../card/CardComponent'
import { Event }                  from '../../interfaces/event.interface';
import { Swiper, SwiperSlide }    from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  events: Event[] | null
}

export const CarouselComponent = ({events}: Props) => {  

  if(!events || events.length === 0){
    return (
      <p className='mt-5 text-body-secondary'>No hay eventos actualmente</p>
    )
  }

  return (
    <Swiper
      spaceBetween={60}
      slidesPerView={4}
      pagination={true}
      modules={[Pagination, Navigation]}
    >
      {
        events?.map((event: Event, index: number) => (
        <SwiperSlide key={index}>
          <CardComponent event={event}/>
        </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
