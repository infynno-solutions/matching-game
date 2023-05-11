import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";

const Modal = ({
  open,
  scoredTime,
  moves,
  initialize,
  setOpen,
  endGame,
  setMatchedCards,
}) => {
  let [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    open ? setIsOpen(true) : setIsOpen(false);
  }, [open, isOpen]);

  function closeModal() {
    setIsOpen(false);
    setMatchedCards([]);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
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
            <div className="flex min-h-full items-center justify-center sm:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl sm:p-6 text-center flex flex-col jus items-center align-middle transition-all">
                  <div className="-z-20 relative">
                    <Image
                      src="/popup.png"
                      alt="modal-img"
                      width={800}
                      height={800}
                      priority
                    />
                  </div>
                  <div className="absolute w-full max-w-xs md:max-w-none top-16 md:left-48 md:top-52 -z-10">
                    <Image
                      src={"/partypop.gif"}
                      alt="popper"
                      width={400}
                      height={400}
                      priority
                    />
                  </div>
                  <div className="absolute xs:mt-3 sm:mt-0 top-1/4 sm:top-1/3 w-fit">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl z-20 font-extrabold leading-6 text-white"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-4">
                        <h2 className="text-xl sm:text-3xl">Congratulations</h2>
                        <h5 className="text-lg sm:text-2xl">You win ! !</h5>
                      </div>
                    </Dialog.Title>
                    <div className="mt-5 sm:mt-10">
                      <p className="text-white text-lg sm:text-2xl">
                        <span className="font-bold"> Scored Time </span>:{" "}
                        {scoredTime}
                      </p>
                    </div>
                    <div className="sm:mt-2">
                      <p className="text-white text-lg sm:text-2xl">
                        {" "}
                        <span className="font-bold">Total Moves</span> : {moves}
                      </p>
                    </div>
                    <div className="mt-6 sm:mt-8 flex justify-center gap-4 sm:gap-10 mx-auto">
                      <button
                        type="button"
                        className="flex justify-center items-center rounded-xl border border-transparent outline-none bg-pink-500 px-4 py-1 sm:py-2 text-base sm:text-lg font-semibold text-white hover:bg-pink-400"
                        onClick={() => {
                          closeModal();
                          initialize();
                        }}
                      >
                        Restart
                      </button>
                      <button
                        type="button"
                        className="flex justify-center items-center rounded-xl border border-transparent bg-pink-500 outline-none px-4 py-1 sm:py-2 text-lg font-semibold text-white hover:bg-pink-400"
                        onClick={() => {
                          closeModal();
                          setOpen(false);
                          endGame();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
