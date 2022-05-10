// import react hooks here:
import { useCallback, useEffect, useReducer, useState } from "react";
// import layout components here:
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import layout data to fulfill layout components here:
import { LAYOUT_DATA } from "./data/layout";
// import game instructions here:
import Instructions from "./components/Instructions";
// import other components here:
import SpeedController from "./components/SpeedController";
import Board from "./components/Board";
import TouchController from "./components/TouchController";
// import reducer function here:
import reducer from "./reducer/reducer";
// import logic functions here:
import generateInitState from "./logic/generateInitState";
import generateMove from "./logic/generateMove";

const DIR_KEYS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
const INIT_STATE = generateInitState();

export default function App() {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);
	const [speed, setSpeed] = useState(500); // 1000 = 1 second // 1000 should be dividable by speed
	const [timer, setTimer] = useState(0); // makeMove() is binded to timer changes
	const [dir, setDir] = useState("ArrowRight"); // direction of the move
	const [isTouchScreen, setTouchScreen] = useState(false);

	const makeMove = useCallback(
		(tick) => {
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
			if (key === "Space" || key === "Enter") {
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
				if (DIR_KEYS.includes(key)) {
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

	// end / lose game screen / alert
	useEffect(() => {
		if (state.end) {
			alert(
				"You lose... To play again press space key or restart button or refresh the browser!"
			);
		}
	}, [state.end]);

	// start timer if game is started (also restarted after fail or pause)
	useEffect(() => {
		if (state.start) {
			const tick = setTimeout(() => {
				setTimer((prevState) => prevState + 1);
			}, speed);
			return () => clearTimeout(tick);
		}
	}, [speed, state]);

	// generate move on each timer change:
	useEffect(() => {
		makeMove(timer);
	}, [timer]);

	// listen to keys pressed:
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		//cleanup this component
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	// check if game is run on touch screen (mobile, tablet)
	// that's needed to:
	// enable touch screen controller if touch screen detected
	// or show instructions how to play for desktops
	useEffect(() => {
		if ("ontouchstart" in document.documentElement) {
			setTouchScreen(true);
		}
		// or we can check the size of the screen to detect if that's a mobile:
		// let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
	}, []);

	return (
		<div className="App">
			<Header title={LAYOUT_DATA.header.title} />
			<main>
				<SpeedController speed={speed} setSpeed={setSpeed} />
				<Board board={state.board} score={state.score} />
				<div style={{ marginTop: "1em" }}>
					{isTouchScreen ? (
						<TouchController
							setDir={setDir}
							end={state.end}
							start={state.start}
							dispatch={dispatch}
						/>
					) : (
						<Instructions />
					)}
				</div>
			</main>
			<Footer
				releaseYear={LAYOUT_DATA.footer.releaseYear}
				links={LAYOUT_DATA.footer.links}
			/>
		</div>
	);
}
