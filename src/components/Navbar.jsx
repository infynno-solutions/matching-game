import React from "react";
import Logo from "../assets/images/logo.svg";
import Image from "next/image";

const Navbar = ({ ...props }) => {
  return (
    <div className="relative cursor-pointer py-6 w-fit mx-auto" {...props}>
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
