import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import data from "../MasonryLayout/data";
import notFound from "../../assets/Image404NotFound.jpg";
import { addImageHeight } from "../../utils/utils";


const Test2 = () => {
  const [lambda, setLambda] = useState([]);

  // call the function with your data array and use the then method to handle the result
  addImageHeight(data)
    .then((newArray) => {
      // log the new array
      console.log(newArray);
      // log the first element
      setLambda(newArray);
    })
    .catch((error) => {
      // handle any error
      console.error(error);
    });

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={lambda}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <a
            href={"/worksing"}
            style={wrapperStyle}
            target="_blank"
            rel="noreferrer noopener"
          >
            {renderDefaultPhoto({ wrapped: true })}
          </a>
        )}
      />
    </>
  );
};

export default Test2;
