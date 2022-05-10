import ControllerButton from "./ControllerButton";
import {
	BsArrowLeftSquare,
	BsArrowRightSquare,
	BsArrowUpSquare,
	BsArrowDownSquare,
	BsPlayCircle,
	BsArrowClockwise,
	BsPauseCircle,
} from "react-icons/bs";

const iconSize = 50; // change icon size here

export default function TouchController({ setDir, dispatch, start, end }) {
	const BUTTONS = [
		// 1. row
		[
			{
				icon: <BsArrowUpSquare size={iconSize} />,
				dir: "ArrowUp",
			},
		],
		// 2. row
		[
			{
				icon: <BsArrowLeftSquare size={iconSize} />,
				dir: "ArrowLeft",
			},
			{
				icon: end ? (
					<BsArrowClockwise size={iconSize} />
				) : start ? (
					<BsPauseCircle size={iconSize} />
				) : (
					<BsPlayCircle size={iconSize} />
				),
			},
			{
				icon: <BsArrowRightSquare size={iconSize} />,
				dir: "ArrowRight",
			},
		],
		// 3. row
		[
			{
				icon: <BsArrowDownSquare size={iconSize} />,
				dir: "ArrowDown",
			},
		],
	];

	return (
		<div className="touch-controller">
			{BUTTONS.map((row, r) => (
				<div className="row" key={"btn-row-" + r}>
					{row.map((btn, b) => (
						<ControllerButton
							key={"controller-button-" + b}
							className="controller-button"
							icon={btn.icon}
							onClick={() => {
								if (btn.dir) {
									setDir(btn.dir);
								} else {
									if (end) {
										dispatch({ type: "reset-game" });
										setDir("ArrowRight");
									} else {
										if (start) {
											dispatch({ type: "pause-game" });
										} else {
											dispatch({ type: "start-game" });
										}
									}
								}
							}}
						/>
					))}
				</div>
			))}
		</div>
	);
}
