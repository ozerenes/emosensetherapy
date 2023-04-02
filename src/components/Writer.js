import React, { useState, useEffect } from "react";

export default ({ text , color }) => {
  const [index, setIndex] = useState(0);

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
    <div style={{ color: color, fontSize: "20px"}}>
      {currentWords.join(" ")}
      <span style={{ color: "#000" }}>{remainingWords.join(" ")}</span>
    </div>
  );
};
