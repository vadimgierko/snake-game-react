// import react-icons here:
import {
	BsArrowLeftSquare,
	BsArrowRightSquare,
	BsArrowUpSquare,
	BsArrowDownSquare,
} from "react-icons/bs";

export default function Instructions() {
	return (
		<div className="instructions">
			<p>Press Enter or Space key to start/ pause/ restart game.</p>
			<p>
				Control the snake's movement with the <BsArrowLeftSquare />{" "}
				<BsArrowRightSquare /> <BsArrowUpSquare /> <BsArrowDownSquare /> keys.
			</p>
		</div>
	);
}
