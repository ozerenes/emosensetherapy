import React, { useEffect, useRef } from 'react';

const ScrollAnimation = ({ children, offset = 0, duration = '1s', delay = '0s', animateOnce = false }) => {
    const elementRef = useRef(null);
    let animationStarted = false;

    const handleScroll = () => {
        if (animateOnce && animationStarted) return;

        const element = elementRef.current;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const offsetValue = windowHeight * (offset / 100);

        if (window.pageYOffset > elementTop - windowHeight + offsetValue && window.pageYOffset < elementTop + elementHeight) {
            element.style.animationDuration = duration;
            element.style.animationDelay = delay;
            element.classList.add('animated');
            animationStarted = true;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={elementRef}>
            {children}
        </div>
    );
};

export default ScrollAnimation;
