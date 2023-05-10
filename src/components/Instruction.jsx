import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import classNames from "classnames";

const Instruction = () => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full px-5 max-w-3xl transform overflow-hidden rounded-2xl sm:p-6 flex flex-col jus items-center align-middle transition-all">
                <div className="flex flex-col items-center w-full max-w-3xl gap-4 sm:gap-8 bg-purple-950 shadow-xl py-4 sm:py-8 px-3 rounded-lg">
                  <Dialog.Title
                    as="div"
                    className="text-3xl z-20 leading-6 text-white"
                  >
                    <div className="flex flex-col items-center gap-2 sm:gap-4">
                      <h2 className="text-xl sm:text-3xl font-extrabold">
                        Matching the cards
                      </h2>
                      <h3 className="text-lg sm:text-2xl font-semibold">
                        Instructions
                      </h3>
                    </div>
                  </Dialog.Title>
                  <ul className="text-white text-base xs:text-lg sm:text-xl ml-10 flex flex-col gap-3 list-decimal">
                    <li>
                      Shuffle and lay out a deck of cards face-down in a grid.
                    </li>
                    <li>Flip two cards face-up on each turn.</li>
                    <li>If the cards match, remove them from the grid.</li>
                    <li>If they don't match, flip them face-down again.</li>
                    <li>Continue until all cards have been matched.</li>
                    <li>Optionally, track time or moves for a challenge.</li>
                    <li>Aim for a high score and enjoy the game!</li>
                    <li>Reshuffle and play again for more fun.</li>
                  </ul>
                  <button
                    onClick={closeModal}
                    className={classNames(
                      "rounded-md bg-pink-500 hover:scale-110 outline-none transition-all ease-in-out delay-75 uppercase px-3 py-2 text-sm sm:text-lg cursor-pointer font-semibold text-white shadow-sm"
                    )}
                  >
                    Start
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Instruction;
