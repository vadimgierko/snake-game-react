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

	return (
		<div className="App">
			<Header />
			<main>
				<Screen board={state.board} />
				<br />
				<button
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
			</main>
			<br />
			<hr />
			<Footer />
		</div>
	);
}
