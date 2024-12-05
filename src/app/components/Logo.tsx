import React from "react";

export const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <h1
      className={`text-center text-3xl font-thin ${className || ""}`}
      {...props}
    >
      <span className="text-accent font-bold">Lite</span>flix
    </h1>
  );
};
