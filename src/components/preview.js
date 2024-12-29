import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import PreviewNavigation from "./previewNavigation";
import StoryPlayer from "./storyPlayer";

import "swiper/css/effect-fade";

const Preview = ({ isOpen, close, stories }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!isOpen) return null;

  const clickHandler = (e) => {
    e.stopPropagation();
  };
  return createPortal(
    <div
      id='preview'
      className='w-screen h-screen bg-black/80 fixed left-0 top-0 z-40'
      onClick={close}>
      <Swiper
        className='z-50'
        dir='rtl'
        effect='fade'
        modules={[EffectFade]}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        centeredSlides
        allowTouchMove={false}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
        {stories.map((node, i) => (
          <SwiperSlide key={i}>
            <div className='h-screen flex justify-center items-center'>
              <div className='w-[360px] h-[660px]' onClick={clickHandler}>
                <StoryPlayer
                  closPreview={close}
                  video={node}
                  active={activeIndex === i}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <PreviewNavigation />
      </Swiper>
    </div>,
    document.body
  );
};

export default Preview;
