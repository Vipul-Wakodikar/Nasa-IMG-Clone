import React from "react";
import notFoundImage from "../../assets/Image404NotFound.jpg";

const NasaLogo = () => {
  return (
    <>
      <a href="https://www.nasa.gov/" target="_blank">
        <img
          src={
            "https://images.nasa.gov/images/nasa_logo-large.png?as=webp" ||
            notFoundImage
          }
          alt="logo"
          // width={107}
          // height={86}
          loading="lazy"
        />
      </a>
    </>
  );
};

export default NasaLogo;
