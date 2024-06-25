import React from "react";
import Header from "./Header/Header";
import Typewriter from "typewriter-effect";

const Landing = () => {
  return (
    <div className="relative">
      <Header />

      <div className="w-screen p-[75px] h-screen fixed flex font-bold justify-center z-[999] items-center text-white text-4xl">
        <Typewriter
          options={{
            strings: [
              "Books have a unique way of stopping time\n in a particular moment and saying: Let's not forget this",
              "The more that you read, the more things you will know.\n The more that you learn, the more places you'll go",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
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
