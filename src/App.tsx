import { KeyboardEventHandler, useEffect, useState } from "react";
import { generateText } from "./helper/generateText";
import Confetti from "react-confetti";
// import useWindowSize from "react-use/lib/useWindowSize";
const regex = /^[a-z ]$/;
function App() {
  const [text, setText] = useState(generateText());
  const [typed, setTyped] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  // const { width, height } = useWindowSize();
  console.log("typed", typed);
  useEffect(() => {
    if (typed.length === text.length) {
      const endTime = new Date().getTime();
      const correctWords = typed
        .split(" ")
        .reduce((acc, letter, i) => (letter === text.split(" ")[i] ? acc + 1 : acc), 0);
      console.log("correctWords", correctWords);
      const wordsPerMin = Math.round(correctWords / ((endTime - startTime) / 1000 / 60));
      setWpm(wordsPerMin);
    }
  }, [typed, text]);

  console.log(
    "correct words",
    typed
      .split(" ")
      .reduce((acc, letter, i) => (letter === text.split(" ")[i] ? acc + 1 : acc), 0)
  );

  const handleKeydown: KeyboardEventHandler = (e) => {
    if (typed === "") setStartTime(new Date().getTime());
    const enteredKey = e.key.toLowerCase();
    if (enteredKey === "backspace") setTyped(typed.substring(0, typed.length - 1));
    if (regex.test(enteredKey)) setTyped(typed + enteredKey);
  };
  return (
    <div className=" w-screen h-screen flex flex-col gap-4 items-center justify-center">
      {!gameStarted && (
        <>
          <h1 className=" text-5xl">Typing Game</h1>
          <button
            onClick={() => setGameStarted(true)}
            className=" text-2xl px-8 py-1 bg-sky-900 rounded-md shadow-lg mt-4"
          >
            Start
          </button>
        </>
      )}
      {gameStarted && (
        <>
          {wpm > 0 && (
            <h3 className=" text-4xl font-light border-zinc-400 rounded-lg shadow-md shadow-slate-600 mb-4 px-6 py-2">
              {" "}
              <span className=" font-extrabold"> {wpm}</span> word per minute
            </h3>
          )}
          {wpm > 2 && <Confetti />}
          <p className=" text-4xl px-8">
            {text.split("").map((letter, i) => (
              <span
                key={i}
                className={
                  !typed[i]
                    ? ``
                    : letter === typed[i]
                    ? ` bg-emerald-600 `
                    : " bg-red-500"
                }
                // className={!typed[i] ? `` : letter === typed[i] ? ` bg-emerald-600` : " bg-red-600"}
              >
                {letter}
              </span>
            ))}
          </p>
          <button
            onClick={() => {
              setGameStarted(false);
              setTyped("");
            }}
            className=" m-8 z-40 text-xl px-8 py-1 bg-sky-900 rounded-md shadow-md shadow-slate-700"
          >
            End
          </button>
          <input
            type="text"
            autoFocus={gameStarted}
            onKeyDown={handleKeydown}
            className=" absolute top-0 left-0 w-screen h-screen opacity-0"
          />
        </>
      )}
    </div>
  );
}

export default App;
