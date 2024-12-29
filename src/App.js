import React, { useState, useEffect, createContext } from "react";
import Story from "./components/story";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import Preview from "./components/preview";

export const UserContext = createContext();

function App() {
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=40")
      .then((res) => res.json())
      .then((data) => setUsers(data.results));
  }, []);
  const [openPreview, setOpenPreview] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState();
  const stories = ["video/test.mp4", "video/steps.mp4"];
  const clickHandler = (user) => {
    setActiveUser(user);
    setOpenPreview(true);
  };

  const handlerClose = () => {
    setOpenPreview(false);
  };

  return (
    <UserContext.Provider value={activeUser}>
      <div className='App my-2 mx-7'>
        <Swiper
          dir='rtl'
          modules={[Navigation]}
          navigation
          spaceBetween={50}
          slidesPerView={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}>
          {users.map((user) => {
            return (
              <SwiperSlide key={user.login.uuid}>
                <button onClick={() => clickHandler(user)}>
                  <Story image={user.picture.thumbnail} title='چاقوی سفری' />
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Preview isOpen={openPreview} close={handlerClose} stories={stories} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
