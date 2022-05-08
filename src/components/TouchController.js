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

export default function TouchController({ setDir, dispatch, start, end }) {
	const BUTTONS = [
		// 1. row
		[
			{
				className: "controller-button",
				icon: <BsArrowUpSquare />,
				dir: "ArrowUp",
			},
		],
		// 2. row
		[
			{
				className: "controller-button",
				icon: <BsArrowLeftSquare />,
				dir: "ArrowLeft",
			},
			{
				className: "controller-button start-button",
				icon: end ? (
					<BsArrowClockwise />
				) : start ? (
					<BsPauseCircle />
				) : (
					<BsPlayCircle />
				),
			},
			{
				className: "controller-button",
				icon: <BsArrowRightSquare />,
				dir: "ArrowRight",
			},
		],
		// 3. row
		[
			{
				className: "controller-button",
				icon: <BsArrowDownSquare />,
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
							key={
								btn.className.includes("start-button")
									? btn.className
									: "controller-button-" + b
							}
							className={btn.className}
							icon={btn.icon}
							onClick={() => {
								if (btn.className === "controller-button") {
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
