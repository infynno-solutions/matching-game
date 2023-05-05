import classNames from "classnames";
import Image from "next/image";
import React from "react";

const Card = ({ flipped, matched, className, data, ...props }) => {
  return (
    <div className={(className, "[perspactive:1000px] relative")}>
      <div
        {...props}
        className={classNames(
          "transition-all ease-in-out duration-500 [transform-style:preserve-3d]",
          flipped || matched ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        <div
          className={classNames(
            "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-purple-800 hover:bg-purple-600 z-10 shadow-xl [backface-visibility:hidden] absolute inset-0 cursor-pointer rounded-md"
          )}
        ></div>
        <div
          className={classNames(
            "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white  cursor-pointer text-2xl z-0 flex justify-center items-center rounded-md",
            matched ? "opacity-80 border-4 border-blue-400" : ""
          )}
        >
          <Image src={data} alt="image" sizes="128px" fill priority />
        </div>
      </div>
    </div>
  );
};

export default Card;
