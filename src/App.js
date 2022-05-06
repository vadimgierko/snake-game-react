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
	const [dir, setDir] = useState("ArrowRight");
	const [isTouchScreen, setTouchScreen] = useState(false);

	const makeMove = useCallback(() => {
		const updatedState = generateMove(state, dir);
		dispatch({
			type: "update-state",
			payload: { state: updatedState },
		});
	}, [state, dir]);

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
		let timer;
		if (state.start) {
			// we set timer to update a board every 1/2 second
			timer = setTimeout(makeMove, 250);
			return () => clearTimeout(timer);
		} else {
			return () => clearTimeout(timer);
		}
	}, [makeMove, state]);

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
