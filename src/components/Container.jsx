import React from "react";

const Container = ({ className, children }) => {
  return (
    <div className={`${className} container mx-auto px-4 md:px-20`}>
      {children}
    </div>
  );
};

export default Container;
