import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";

const DropDown = () => {
  const context = useContext(AppContext);
  useEffect(() => {}, [context.user]);
  const handleChange = () => {
    context.setCancel(true);
    localStorage.setItem("user", "");
    context.setUser("");
    context.setTimer(false);
  };

  return (
    <div
      className={classNames(
        "absolute top-6 right-6 w-56 text-right",
        context.user ? "block" : "hidden"
      )}
    >
      <Menu as="div" className="relative inline-block text-center">
        <div>
          <Menu.Button className="flex w-full z-30 justify-center bg-black rounded-full bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {context.user.username}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleChange}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Change Username
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
