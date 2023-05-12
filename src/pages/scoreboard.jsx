import LeftArrow from "@/assets/icons/LeftArrow";
import Navbar from "@/components/Navbar";
import supabase from "@/config/supabaseClient";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import HeptaBrown from "../assets/images/HeptaBrown.svg";
import HeptaBrownDark from "../assets/images/HeptaBrownDark.svg";
import Image from "next/image";
import { NextSeo } from "next-seo";

const Scoreboard = ({ scores }) => {
  return (
    <>
      <NextSeo
        title="Memory Lane - Infynno Solutions"
        description="The game starts with all the cards face down and players take turns to turn over two cards. If the two cards have the same picture, then they keep the cards, otherwise they turn the cards face down again. The winner is the person with the most cards when all the cards have been taken."
        openGraph={{
          url: process.env.NEXT_PUBLIC_APP_URL,
          title: "Memory Lane - Infynno Solutions",
          description:
            "The game starts with all the cards face down and players take turns to turn over two cards. If the two cards have the same picture, then they keep the cards, otherwise they turn the cards face down again. The winner is the person with the most cards when all the cards have been taken.",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/cover.png`,
              width: 800,
              height: 600,
              alt: "memorylane-img",
              type: "image/png",
            },
          ],
        }}
      />
      <Link href="/">
        <Navbar />
      </Link>
      <div className="w-screen min-h-[calc(100vh-200px)] flex justify-center items-center">
        <Link href="/">
          <LeftArrow
            className={classNames(
              "absolute top-6 left-6 w-8 h-8 text-white hover:scale-105 hidden sm:block cursor-pointer"
            )}
          />
        </Link>
        <div>
          <div className="w-full overflow-x-scroll md:overflow-auto max-w-[300px] xs:max-w-sm sm:max-w-xl md:max-w-none">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-4">
              <thead className="bg-purple-800 rounded-lg text-base text-white font-semibold w-full">
                <tr className="">
                  <th className="py-5 pl-8">User Name</th>
                  <th className="px-6">Moves</th>
                  <th className="px-6">Time</th>
                  <th className="px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => {
                  const date = new Date(score.created_at);
                  const formatedDate = date.toDateString();
                  return (
                    <tr key={index}>
                      <td className="py-4 px-6 flex gap-3 items-center">
                        <div className="relative">
                          <div className="min-w-[33px]">
                            {index + 1 === 1 ? (
                              <Image src={HeptaBrown} alt="hepta-brown" />
                            ) : (
                              <Image src={HeptaBrownDark} alt="hepta-brown" />
                            )}
                          </div>
                          <p className="absolute top-[5px] left-3 text-white">
                            {index + 1}
                          </p>
                        </div>{" "}
                        {score.users.username}
                      </td>
                      <td className="px-6">{score.moves}</td>
                      <td className="px-6">{score.time}</td>
                      <td className="px-6 whitespace-nowrap">{formatedDate}</td>
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
    .select(`moves,time,created_at,users(username)`)
    .order("moves, time", { ascending: true })
    .limit(5);

  return {
    props: {
      scores: data,
    },
  };
}

export default Scoreboard;
