import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import Timer from "@/components/Timer";
import Modal from "@/components/Modal";
import ListBox from "@/components/ListBox";
import classNames from "classnames";
import Navbar from "@/components/Navbar";
import { NextSeo } from "next-seo";
import Instruction from "@/components/Instruction";
import { THEME_LIST } from "@/utils/theme";
import LeftArrow from "@/assets/icons/LeftArrow";

export default function Home() {
  const [theme, setTheme] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(false);
  const [scoredTime, setScoredTime] = useState(null);
  const [flipAudio, setFlipAudio] = useState(null);
  const [matchAudio, setMatchAudio] = useState(null);
  const [winningAudio, setWinningAudio] = useState(null);
  const [cancel, setCancel] = useState(true);

  const shuffle = () => {
    const shuffledCards = [...theme, ...theme]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
  };
  useMemo(() => shuffle(), [theme]);

  const initialize = () => {
    shuffle();
    setGameOver(false);
    setCancel(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(true);
  };
  const updateActiveCards = (i) => {
    if (!matchedCards.includes(i)) {
      if (!flippedCards.includes(i)) {
        if (flippedCards.length == 1) {
          const firstIdx = flippedCards[0];
          const secondIdx = i;
          if (boardData[firstIdx] == boardData[secondIdx]) {
            matchAudio.play();
            setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
          } else {
            setTimeout(() => {
              setFlippedCards([]);
            }, 500);
          }
          setFlippedCards([...flippedCards, i]);
        } else if (flippedCards.length == 2) {
          setFlippedCards([i]);
        } else {
          setFlippedCards([...flippedCards, i]);
        }

        setMoves((v) => v + 1);
      }
    }
  };
  const endGame = () => {
    setTimer(false);
    setCancel(true);
  };
  useEffect(() => {
    if (matchedCards.length == 20) {
      setGameOver(true);
      setTimer(false);
    }
  }, [moves]);

  useEffect(() => {
    setFlipAudio(new Audio("/cardFlip.mp3"));
    setMatchAudio(new Audio("/cardMatch.wav"));
    setWinningAudio(new Audio("/winning.wav"));
  }, []);

  useEffect(() => {
    if (gameOver) {
      winningAudio.loop = true;
      winningAudio.play();
    } else {
      winningAudio && winningAudio.pause();
    }
  }, [gameOver]);
  return (
    <div className="flex flex-col sm:flex-col gap-3 justify-center">
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
      <LeftArrow
        className="absolute top-6 hidden sm:block left-6 w-8 h-8 text-white hover:scale-105 cursor-pointer"
        onClick={() => endGame()}
      />
      <Instruction />
      <Navbar endGame={endGame} />
      <Modal
        open={gameOver}
        setOpen={setGameOver}
        scoredTime={scoredTime}
        moves={moves}
        initialize={initialize}
        endGame={endGame}
      />
      <div className="w-full flex flex-col py-3 justify-center gap-10 max-w-3xl min-h-[calc(100vh-200px)] mx-auto">
        <div
          className={classNames(
            "z-10 self-center",
            cancel ? "block" : "hidden"
          )}
        >
          <ListBox
            setTheme={setTheme}
            characters={THEME_LIST}
            timer={timer || gameOver}
            initialize={initialize}
            cancel={cancel}
            setCancel={setCancel}
          />
        </div>
        <div
          className={classNames(
            "grid grid-col-2 grid-flow-col gap-8 mx-auto ",
            cancel ? "hidden" : "block"
          )}
        >
          <div
            className={classNames(
              "rounded-md bg-pink-500 uppercase px-3 py-2 text-lg sm:text-xl font-semibold text-white shadow-sm",
              !cancel ? "block" : "hidden"
            )}
          >
            Moves - {moves}
          </div>
          <div
            className={classNames(
              "rounded-md bg-pink-500 px-3 py-2 text-lg sm:text-xl font-semibold text-white shadow-sm",
              !cancel ? "block" : "hidden"
            )}
          >
            <Timer start={timer} setTime={setScoredTime} />
          </div>
        </div>
        <div
          className={classNames(
            "w-fit relative  mx-auto grid grid-cols-4 sm:grid-cols-5 xs:px-3 gap-3 sm:gap-6",
            cancel ? "hidden" : "block"
          )}
        >
          {/* <Instruction /> */}

          {boardData?.map((data, index) => {
            const flipped = flippedCards.includes(index) ? true : false;
            const matched = matchedCards.includes(index) ? true : false;
            return (
              <div key={index}>
                <Card
                  data={data}
                  onClick={() => {
                    updateActiveCards(index);
                    flipAudio.play();
                  }}
                  flipped={flipped}
                  matched={matched}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
