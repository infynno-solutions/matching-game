import React, { useEffect } from "react";
import { useState } from "react";

import Image from "next/image";
import classNames from "classnames";

const ListBox = ({
  setTheme,
  characters,
  timer,
  initialize,
  cancel,
  setCancel,
}) => {
  const [selected, setSelected] = useState(characters[0]);
  useEffect(() => {
    setTheme(selected?.data);
  }, [selected]);

  return (
    <div className={classNames("w-fit", timer ? "hidden" : "block")}>
      <div className="flex flex-wrap gap-3 justify-center sm:gap-10">
        {" "}
        {characters?.map((ch, index) => {
          return (
            <div
              onClick={() => {
                setSelected(ch);
                initialize();
              }}
              className={classNames(
                "hover:bg-purple-600 bg-purple-400 text-black font-normal hover:font-bold group shadow-lg hover:text-white cursor-pointer p-3 flex flex-col justify-center items-center gap-3 rounded-md"
              )}
              key={index}
            >
              <div className="relative w-52 h-52">
                <Image
                  src={ch.data[6]}
                  className="group-hover:scale-110"
                  alt="theme-image"
                  fill
                  priority
                  sizes="208px"
                />
              </div>
              <h2>{ch.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListBox;
