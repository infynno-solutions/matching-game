import React, { useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import { userNameSchema } from "@/utils/validationSchema";
import supabase from "@/config/supabaseClient";
import AppContext from "./AppContext";

const Instruction = () => {
  let [isOpen, setIsOpen] = useState(true);
  const [ipAddress, setIPAddress] = useState("");
  const [error, setError] = useState("");
  const context = useContext(AppContext);

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        const data = await response.json();
        setIPAddress(data.ip);
      } catch (error) {
        console.log("Error retrieving IP address:", error);
      }
    };

    fetchIPAddress();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    localStorage.getItem("user") ? setIsOpen(false) : setIsOpen(true);
  }, [context.user]);

  const handleSumit = async (values) => {
    const { data, error, status, statusText } = await supabase
      .from("users")
      .insert({ username: values.username, ip_address: ipAddress })
      .select();
    if (!error) {
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data[0].id, username: data[0].username })
        );
        context.setUser({ id: data[0].id, username: data[0].username });
        context.setCancel(true);
      }
      closeModal();
      setError(null);
    } else {
      if (status == 409) {
        setError("Username already taken");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
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
                <div className="flex flex-col items-center w-full max-w-3xl gap-4 sm:gap-8 bg-purple-950 shadow-xl py-8 px-3 rounded-lg">
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
                  <Formik
                    initialValues={{
                      username: "",
                    }}
                    validationSchema={userNameSchema}
                    onSubmit={handleSumit}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form className="flex gap-4 justify-center items-center flex-wrap">
                        <div className="relative">
                          <Field
                            type="text"
                            name="username"
                            placeholder="User Name"
                            onKeyUp={() => setError(null)}
                            className="p-2 sm:p-3 rounded-md text-white bg-transparent border border-purple-500 outline-none"
                          />
                          <p className="text-red-500 w-full absolute mt-1">
                            {errors.username && touched.username
                              ? errors.username
                              : error
                              ? error
                              : ""}
                          </p>
                        </div>
                        <button
                          type="submit"
                          className={classNames(
                            "rounded-md bg-pink-500 relative hover:scale-110 outline-none transition-all ease-in-out delay-75 uppercase px-3 py-2 text-sm sm:text-lg cursor-pointer font-semibold text-white shadow-sm",
                            error ? "mt-5 xs:mt-0" : "mt-2 xs:mt-0"
                          )}
                        >
                          Start
                        </button>
                      </Form>
                    )}
                  </Formik>
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
