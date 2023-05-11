import LeftArrow from "@/assets/icons/LeftArrow";
import Navbar from "@/components/Navbar";
import supabase from "@/config/supabaseClient";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

const Scoreboard = ({ scores }) => {
  return (
    <>
      <Link href="/">
        <Navbar />
      </Link>
      <div className="w-screen h-full min-h-[calc(100vh-200px)] flex justify-center items-center">
        <Link href="/">
          <LeftArrow
            className={classNames(
              "absolute top-6 left-6 w-8 h-8 text-white hover:scale-105 cursor-pointer"
            )}
          />
        </Link>
        <div>
          <div class="relative overflow-x-auto">
            <table class="w-full text-lg text-left text-gray-500 dark:text-gray-400 shadow-xl">
              <thead class="text-lg text-white uppercase bg-purple-900 dark:bg-purple-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Moves
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => {
                  const date = new Date(score.created_at);
                  const formatedDate = date.toDateString();
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {score.users.username}
                      </th>
                      <td class="px-6 py-4">{score.moves}</td>
                      <td class="px-6 py-4">{score.time}</td>
                      <td class="px-6 py-4">{formatedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  let { data } = await supabase
    .from("scoreboard")
    .select(`moves,time,created_at,users(username)`);

  return {
    props: {
      scores: data,
    },
  };
}

export default Scoreboard;
