import { useCallback, useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
//import Clock from "./components/Clock";
import SpeedController from "./components/SpeedController";
import Screen from "./components/Screen";
import TouchController from "./components/TouchController";
import Footer from "./components/Footer";
import reducer from "./reducer/reducer";
import generateInitState from "./logic/generateInitState";
import generateMove from "./logic/generateMove";
import {
	BsArrowLeftSquare,
	BsArrowRightSquare,
	BsArrowUpSquare,
	BsArrowDownSquare,
} from "react-icons/bs";

const KEYS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];

const INIT_STATE = generateInitState();

export default function App() {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);
	const [speed, setSpeed] = useState(500); // 1000 = 1 second // 1000 should be dividable by speed
	const [timer, setTimer] = useState(0);
	const [dir, setDir] = useState("ArrowRight");
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
		if (state.end) {
			alert(
				"You lose... To play again press space key or restart button or refresh the browser!"
			);
		}
	}, [state.end]);

	useEffect(() => {
		if (state.start) {
			const tick = setTimeout(() => {
				setTimer((prevState) => prevState + 1);
			}, speed);
			return () => clearTimeout(tick);
		}
	}, [speed, state]);

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
				{/* <Clock speed={speed} timerValue={timer} /> */}
				<SpeedController speed={speed} setSpeed={setSpeed} />
				<Screen board={state.board} score={state.score} />
				<div style={{ marginTop: "1em" }}>
					{isTouchScreen ? (
						<TouchController
							setDir={setDir}
							end={state.end}
							start={state.start}
							dispatch={dispatch}
						/>
					) : (
						<div>
							<p>Press Enter or Space key to start/ pause/ restart game.</p>
							<p>
								Control the snake's movement with the <BsArrowLeftSquare />{" "}
								<BsArrowRightSquare /> <BsArrowUpSquare /> <BsArrowDownSquare />{" "}
								keys.
							</p>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}
