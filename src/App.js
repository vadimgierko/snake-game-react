import "./App.css";
import { useCallback, useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import Screen from "./components/Screen";
import Footer from "./components/Footer";
import reducer from "./reducer/reducer";
import generateInitState from "./logic/generateInitState";
import generateMove from "./logic/generateMove";

const KEYS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];

const INIT_STATE = generateInitState();

export default function App() {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);
	const [timer, setTimer] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [dir, setDir] = useState("ArrowRight");
	const [isTouchScreen, setTouchScreen] = useState(false);

	const makeMove = useCallback(
		(tick) => {
			//console.log("tick/timer:", tick);
			const updatedState = generateMove(state, dir);
			dispatch({
				type: "update-state",
				payload: { state: updatedState },
			});
		},
		[state, dir]
	);

	const handleKeyDown = useCallback(
		(e) => {
			const key = e.code;
			if (key === "Space") {
				if (state.end) {
					dispatch({ type: "reset-game" });
					setDir("ArrowRight");
				} else {
					if (state.start) {
						dispatch({ type: "pause-game" });
					} else {
						dispatch({ type: "start-game" });
					}
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
		[state, dir]
	);

	useEffect(() => {
		if (state.start) {
			const tick = setTimeout(() => {
				const updatedTimer = timer + 1;
				timer % 4 === 0 && setSeconds((prevState) => prevState + 1);
				timer % 240 === 0 && setMinutes((prevState) => prevState + 1);
				setTimer(updatedTimer);
			}, 250);
			return () => clearTimeout(tick);
		}
	}, [timer, state]);

	useEffect(() => {
		makeMove(timer);
	}, [timer]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		//cleanup this component
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	useEffect(() => {
		if ("ontouchstart" in document.documentElement) {
			setTouchScreen(true);
		}
		// or we can check the size of the screen to detect if that's a mobile:
		// let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
	}, []);

	return (
		<div className="App">
			<Header />
			<main>
				<p>
					{minutes < 10 ? "0" + minutes : minutes} :{" "}
					{seconds < 10 ? "0" + seconds : seconds}
				</p>
				<Screen board={state.board} />
				{isTouchScreen ? (
					<div className="controller" style={{ marginTop: "1em" }}>
						<div className="row">
							<button
								className="controller-button"
								onClick={() => {
									setDir("ArrowUp");
								}}
							>
								up
							</button>
						</div>
						<div className="row">
							<button
								className="controller-button"
								onClick={() => {
									setDir("ArrowLeft");
								}}
							>
								left
							</button>
							<button
								className="controller-button"
								style={{ backgroundColor: "green", color: "white" }}
								onClick={() => {
									if (state.end) {
										dispatch({ type: "reset-game" });
										setDir("ArrowRight");
									} else {
										if (state.start) {
											dispatch({ type: "pause-game" });
										} else {
											dispatch({ type: "start-game" });
										}
									}
								}}
							>
								{state.end ? "restart" : state.start ? "pause" : "start"}
							</button>
							<button
								className="controller-button"
								onClick={() => {
									setDir("ArrowRight");
								}}
							>
								right
							</button>
						</div>
						<button
							className="controller-button"
							onClick={() => {
								setDir("ArrowDown");
							}}
						>
							down
						</button>
					</div>
				) : (
					<button
						style={{ margin: "1em 1em 0em 1em" }}
						onClick={() => {
							if (state.end) {
								dispatch({ type: "reset-game" });
								setDir("ArrowRight");
							} else {
								if (state.start) {
									dispatch({ type: "pause-game" });
								} else {
									dispatch({ type: "start-game" });
								}
							}
						}}
					>
						{state.end ? "reset" : state.start ? "pause" : "start"}
					</button>
				)}
				<p>score: {state.score}</p>
			</main>
			<hr />
			<Footer />
		</div>
	);
}
