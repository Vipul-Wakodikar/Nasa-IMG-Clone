import React, { useEffect, useState } from "react";
import style from "./index.module.css";

const AudioRender = ({ photo, wrapperStyle, keyId }) => {
  const [audioData, setAudioData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const AudioData = await fetch(photo.href);
      const json = await AudioData.json();
      const previewAudio = json.find(
        (element) =>
          element.includes("orig.wav") || element.includes("128k.mp3")
      );
      setAudioData(previewAudio);
    };
    fetchData();
  }, [photo]);

  return (
    <>
    {photo.data[0].media_type === "audio" && (<div style={wrapperStyle} key={keyId}>
      <div className={style.audioImageStyle}>
        <img
          src="https://images.nasa.gov/images/search_audio-icon.png?as=webp"
          alt=""
        />
      </div>
      <audio className={style.audioWidth} controls>
        {audioData && <source src={audioData} type="audio/mp3" />}
        Your browser does not support the audio element.
      </audio>
      <h3 className={style.titleStyle}>{photo.data[0].title}</h3>
      {/* <p>{photo.data[0].date_created}</p> */}
    </div>)}
    </>
  );
};

export default AudioRender;
