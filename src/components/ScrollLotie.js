import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

const ScrollControlledLottie = ({ animationData }) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const previousScrollY = useRef(0);
    const isScrollingUp = useRef(false);

    useEffect(() => {
        animationRef.current = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: false, // Loop özelliğini devre dışı bırakın
            autoplay: false,
            animationData: animationData,
        });

        const handleScroll = () => {
            const { top, bottom } = containerRef.current.getBoundingClientRect();
            const { innerHeight } = window;
            const currentScrollY = window.scrollY;

            if (currentScrollY < previousScrollY.current) {
                isScrollingUp.current = true;
            } else {
                isScrollingUp.current = false;
            }

            previousScrollY.current = currentScrollY;

            if (top < innerHeight && bottom > 0) {
                if (isScrollingUp.current) {
                    animationRef.current.goToAndStop(0, true); // Animasyonu geriye sar ve duraklat
                } else {
                    animationRef.current.playSegments([0, animationRef.current.totalFrames], true); // Animasyonu ileriye doğru oynat
                }
            } else {
                animationRef.current.pause();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [animationData]);

    return <div ref={containerRef} />;
};

export default ScrollControlledLottie;
