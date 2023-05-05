import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import Timer from "@/components/Timer";
import Modal from "@/components/Modal";
import ListBox from "@/components/ListBox";
import Bart1 from "../assets/theme/Cartoon-caractor/bart-simpson.png";
import Bart2 from "../assets/theme/Cartoon-caractor/blossom-bubbles.png";
import Bart3 from "../assets/theme/Cartoon-caractor/bugs-bunny.png";
import Bart4 from "../assets/theme/Cartoon-caractor/charlie-brown.png";
import Bart5 from "../assets/theme/Cartoon-caractor/daffy-duck.png";
import Bart6 from "../assets/theme/Cartoon-caractor/donald-duck.png";
import Bart7 from "../assets/theme/Cartoon-caractor/doraemon.png";
import Bart8 from "../assets/theme/Cartoon-caractor/Pikachu.png";
import Bart9 from "../assets/theme/Cartoon-caractor/shaggy-rogers.png";
import Bart10 from "../assets/theme/Cartoon-caractor/tom-jerry.png";
import classNames from "classnames";
import Logo from "../assets/images/logo.svg";
import Image from "next/image";

const characters = [
  {
    name: "Pokemon Characters",
    data: [
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png",
    ],
  },
  {
    name: "Cartoon Characters",
    data: [
      Bart1,
      Bart2,
      Bart3,
      Bart4,
      Bart5,
      Bart6,
      Bart7,
      Bart8,
      Bart9,
      Bart10,
    ],
  },
];

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
            }, 600);
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
  useEffect(() => {
    if (matchedCards.length == 20) {
      setGameOver(true);
      setTimer(false);
    }
  }, [moves]);
  useEffect(() => {
    setFlipAudio(new Audio("/cardFlip.mp3"));
    setMatchAudio(new Audio("/cardMatch.wav"));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="absolute top-6 mx-auto sm:left-6 ">
        <Image
          src={Logo}
          alt="logo"
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
        />
      </div>
      <Modal
        open={gameOver}
        setOpen={setGameOver}
        scoredTime={scoredTime}
        moves={moves}
        initialize={initialize}
        setCancel={setCancel}
      />
      <div className="w-full flex flex-col justify-center gap-10 max-w-3xl h-screen mx-auto">
        <div
          className={classNames(
            "z-10 self-center",
            cancel ? "block" : "hidden"
          )}
        >
          <ListBox
            setTheme={setTheme}
            characters={characters}
            timer={timer || gameOver}
            initialize={initialize}
          />
        </div>
        <div
          className={classNames(
            "grid grid-col-2 grid-flow-col gap-8 mx-auto",
            cancel ? "hidden" : "block"
          )}
        >
          <div
            className={classNames(
              "rounded-md bg-pink-500 uppercase px-3 py-2 text-xl font-semibold text-white shadow-sm",
              !cancel ? "block" : "hidden"
            )}
          >
            Moves - {moves}
          </div>
          <div
            className={classNames(
              "rounded-md bg-pink-500 px-3 py-2 text-xl font-semibold text-white shadow-sm",
              !cancel ? "block" : "hidden"
            )}
          >
            <Timer start={timer} setTime={setScoredTime} />
          </div>
        </div>
        <div
          className={classNames(
            "w-fit mx-auto grid grid-cols-4 sm:grid-cols-5 px-3 gap-3 sm:gap-6",
            cancel ? "hidden" : "block"
          )}
        >
          {boardData.map((data, index) => {
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
