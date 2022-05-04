import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Screen from "./components/Screen";
import runGame from "./logic/runGame";
import generateInitState from "./logic/generateInitState";

const KEYS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];

export default function App() {
	const [state, setState] = useState({
		board: null,
		snake: null,
		food: null,
		eatenFood: null,
	});
	const [game, setGame] = useState({
		start: false,
		pause: false,
		end: false,
	});
	const [dir, setDir] = useState("ArrowRight");

	function startGame() {
		setGame({
			start: true,
			pause: false,
			end: false,
		});
	}

	function pauseGame() {
		setGame({
			start: false,
			pause: true,
			end: false,
		});
	}

	function endGame() {
		setState({
			board: null,
			snake: null,
			food: null,
			eatenFood: null,
		});
		setGame({
			start: false,
			pause: false,
			end: true,
		});
		setDir("ArrowRight");
	}

	const makeMove = useCallback(() => {
		// generate next snake move
		const updatedState = runGame(state, dir, endGame);
		if (game.start) {
			setState(updatedState);
		} else if (game.end) {
			// setState({
			// 	board: null,
			// 	snake: null,
			// 	food: null,
			// 	eatenFood: null,
			// });
			// setDir("ArrowRight");
		}
	}, [state, dir, game]);

	const handleKeyDown = useCallback(
		(e) => {
			const key = e.code;
			if (key === "Space") {
				if (game.start) {
					pauseGame();
				} else if (game.pause) {
					startGame();
				} else {
					startGame();
				}
			} else {
				if (KEYS.includes(key)) {
					if (
						(key === "ArrowRight" && dir === "ArrowLeft") ||
						(key === "ArrowLeft" && dir === "ArrowRight") ||
						(key === "ArrowDown" && dir === "ArrowUp") ||
						(key === "ArrowUp" && dir === "ArrowDown")
					) {
						// do nothing => do not change dir && prevDir
					} else {
						setDir(key);
					}
				}
			}
		},
		[dir, game]
	);

	useEffect(() => {
		const board = state.board;
		if (!board || (board && !board.length)) {
			const initState = generateInitState();
			setState((prevState) => {
				return { ...prevState, ...initState };
			});
		}
	}, [state]);

	useEffect(() => {
		let timer;
		if (game.start) {
			// we set timer to update a board every 1/2 second
			timer = setTimeout(makeMove, 250);
			return () => clearTimeout(timer);
		} else {
			return () => clearTimeout(timer);
		}
	}, [game.start, makeMove]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		//cleanup this component
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	if (!state.board) return null;

	return (
		<div className="App">
			<header>
				<h1>Snake Game</h1>
				<hr />
			</header>
			<main>
				<Screen board={state.board} />
				<br />
				<button
					onClick={() => {
						if (game.start) {
							pauseGame();
						} else if (game.pause) {
							startGame();
						} else if (game.end) {
							startGame();
						} else {
							startGame();
						}
					}}
				>
					{game.start
						? "pause"
						: !game.start && !game.pause && !game.end
						? "start"
						: null}
					{game.pause && "start"}
					{game.end && "restart"}
				</button>
			</main>
			<br />
			<hr />
			<footer>
				<p>
					created by{" "}
					<a
						href="https://github.com/vadimgierko"
						target="_blank"
						rel="noreferrer"
					>
						Vadim Gierko
					</a>{" "}
					| 2022
				</p>
				<p>
					<a
						href="https://github.com/vadimgierko/snake-game-react"
						target="_blank"
						rel="noreferrer"
					>
						source code on GitHub
					</a>{" "}
					|{" "}
					<a href="" target="_blank" rel="noreferrer">
						CodeSandbox demo
					</a>
				</p>
				<p>
					The game was written in React entirely by me for entertainment and
					learning purposes. I have not used any tutorial to be able to test
					myself in writing logic & handle timer & event listeners.
				</p>
			</footer>
		</div>
	);
}
