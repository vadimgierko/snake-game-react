import generateInitState from "./generateInitState";

export default function reducer(state, action) {
	switch (action.type) {
		case "update-board":
			return {
				...state,
				board: action.payload.board,
			};
		case "update-snake":
			return {
				...state,
				snake: action.payload.snake,
			};
		case "update-food":
			return {
				...state,
				food: action.payload.food,
			};
		case "update-eaten-food":
			return {
				...state,
				eatenFood: action.payload.eatenFood,
			};
		case "update-dir":
			return {
				...state,
				dir: action.payload.dir,
			};
		case "start-game":
			return {
				...state,
				start: true,
			};
		case "pause-game":
			return {
				...state,
				start: false,
			};
		case "reset-state":
			const INIT_STATE = generateInitState();
			return INIT_STATE;
		default:
			return state;
	}
}
