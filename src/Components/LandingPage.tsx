import React from "react";
import Header from "./Header/Header";

const Landing = () => {
  return (
    <div className="relative">
      <Header />
      <video
        loop
        autoPlay
        muted
        id="landing-page-video"
        className="absolute w-full h-screen backdrop-brightness-75 object-cover"
      >
        <source
          src={require("../Assets/Landing_page_video.mp4")}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Landing;
