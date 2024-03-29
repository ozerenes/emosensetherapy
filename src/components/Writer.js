import React, { useState, useEffect } from "react";

export default ({ text , color , minHeight, animate , bg , center, fontSize}) => {
  const [index, setIndex] = useState(animate ? 0 : text.split(" ").length);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const words = text.split(" ");
  const currentWords = words.slice(0, index);
  const remainingWords = words.slice(index);

  return (
    <div style={{ color: color,textAlign: center ? "center" : "", fontSize: fontSize ?? "20px", minHeight: (minHeight ?? "")}}>
      {currentWords.join(" ")}
      <span style={{ color: bg ?? "#34374C" }}>{remainingWords.join(" ")}</span>
    </div>
  );
};
