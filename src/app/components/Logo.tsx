import React from "react";

export const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <h1
      className={`font-thin text-3xl text-center ${className || ""}`}
      {...props}
    >
      <span className="font-bold text-accent">Lite</span>flix
    </h1>
  );
};
