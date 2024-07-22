import { SwiperSlide, Swiper }  from 'swiper/react'
import { Pagination }           from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  elements: string[]
}

export const ImagesCarousel = ({elements}: Props) => {
  return (

      <Swiper
        pagination={true} modules={[Pagination]} 
      >
        {
          elements.map((e: string, index: number) => (
          <SwiperSlide key={index}>
            {
              !!e &&
              <img src={e} alt={e} width={'100%'} height={300}/>
            }
          </SwiperSlide>
          ))
        }
      </Swiper>
  )
}
