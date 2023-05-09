import React from "react";
import Logo from "../assets/images/logo.svg";
import Image from "next/image";

const Navbar = ({ endGame }) => {
  return (
    <div
      onClick={() => endGame()}
      className="relative flex cursor-pointer justify-center py-6 w-full"
    >
      <Image
        src={Logo}
        alt="logo"
        width={200}
        height={200}
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
};

export default Navbar;
