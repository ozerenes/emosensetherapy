import React from 'react';
import Lottie from 'react-lottie';

const LottieAnimation = ({width,height,animation,radius,loop}) => {

  const defaultOptions = {
    loop: loop ?? true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{borderRadius: radius ?? "",overflow: "hidden"}}>
      <Lottie 
        options={defaultOptions}
        height={height ?? 60 }
        width={width ?? 60}
      />
    </div>
  );
};

export default LottieAnimation;
