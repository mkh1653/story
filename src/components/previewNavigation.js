import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSwiper } from "swiper/react";

const PreviewNavigation = () => {
  const swiper = useSwiper();
  return (
    <div className="">
      <button
        className='text-white absolute right-1/4 top-1/2 z-50'
        onClick={(e) => {
          e.stopPropagation();
          swiper.slideNext();
        }}>
        <FontAwesomeIcon size='4x' icon={faChevronCircleRight} />
      </button>

      <button
        className='text-white absolute left-1/4 top-1/2 z-50'
        onClick={(e) => {
          e.stopPropagation();
          swiper.slidePrev();
        }}>
        <FontAwesomeIcon size='4x' icon={faChevronCircleLeft} />
      </button>
    </div>
  );
};

export default PreviewNavigation;
