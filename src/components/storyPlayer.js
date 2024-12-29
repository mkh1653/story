import React, { useRef, useState, useEffect, useContext } from "react";
import Slider from "@mui/material/Slider";
import ReactPlayer from "react-player";
import { UserContext } from "./../App";
import { useSwiper } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const StoryPlayer = ({ video, active, closPreview }) => {
  const user = useContext(UserContext);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const swiper = useSwiper();
  useEffect(() => {
    if (active) {
      playerRef.current.seekTo(0);
      setPlaying(true);
    }
  }, [active]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handleSeek = (e, newValue) => {
    e.stopPropagation();
    e.preventDefault();
    setProgress(newValue);
    if (playerRef.current) {
      playerRef.current.seekTo(newValue);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
    if (state.playedSeconds >= duration - 1) {
      swiper.slideNext();
    }
  };

  const togglePlayPause = () => {
    setPlaying((prevValue) => !prevValue);
  };

  const handleSliderInteraction = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='relative text-white'>
      <div className='absolute w-full top-0 pt-2 px-2 flex items-center gap-2'>
        <button className='z-50 block' onClick={closPreview}>
          <FontAwesomeIcon icon={faArrowRight} size='lg' />
        </button>
        <div className='flex items-center'>
          <img
            className='w-14 h-14 rounded-full'
            src={user.picture.thumbnail}
          />
          <span className='pr-2'>{user.login.username}</span>
        </div>
        <div className='mr-auto z-50'>
          <button className='bg-white text-black rounded-md px-6 py-2 text-sm font-semibold'>
            دنبال کردن
          </button>
        </div>
      </div>
      <div className='absolute max-h-14 w-2/3 right-0 bottom-14 pr-2'>
        <h1 className='text-xl font-bold'>لورم ایپسوم متن ساختگی با</h1>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام{" "}
        </p>
      </div>
      <div className='absolute left-0 bottom-10 flex flex-col pl-2'>
        <button
          className='text-center z-50 mb-3'
          onClick={() => setLiked((prev) => !prev)}>
          <FontAwesomeIcon
            className={`${liked ? "text-red-500" : "text-white"}`}
            icon={liked ? faHeartSolid : faHeart}
            size='lg'
          />
          <br />
          179
        </button>
        <button className='text-white text-center z-50'>
          <FontAwesomeIcon icon={faComment} size='lg' />
          <br />
          17
        </button>
      </div>
      <ReactPlayer
        url={video}
        ref={playerRef}
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        playing={playing}
        onMouseDown={togglePlayPause}
        width='100%'
        height='100%'
      />
      <div className='absolute bottom-1.5 z-50 w-full px-1'>
        <Slider
          aria-label='time-indicator'
          size='small'
          value={progress}
          min={0}
          max={duration}
          step={1}
          onChange={handleSeek}
          onMouseDown={handleSliderInteraction}
          onTouchStart={handleSliderInteraction}
          sx={(t) => ({
            color: "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                ...t.applyStyles("dark", {
                  boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                }),
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
            ...t.applyStyles("dark", {
              color: "#fff",
            }),
          })}
        />
      </div>
    </div>
  );
};

export default StoryPlayer;
