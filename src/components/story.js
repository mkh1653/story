import React from "react";

const Story = ({ image, title }) => {
  return (
    <>
      <img className='story--box' src={image} />
      <span className="text-sm">{title}</span>
    </>
  );
};

export default Story;
