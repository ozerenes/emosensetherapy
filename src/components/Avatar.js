import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/avatar';
import yogaData from "../assets/yoga"

const LottieAnimation = ({width,height,animation}) => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation == "avatar" ? animationData : yogaData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie 
        options={defaultOptions}
        height={height ?? 100 }
        width={width ?? 100}
      />
    </div>
  );
};

export default LottieAnimation;
