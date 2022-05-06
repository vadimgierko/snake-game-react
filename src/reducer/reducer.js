import generateInitState from "../logic/generateInitState";

export default function reducer(state, action) {
	switch (action.type) {
		case "update-state":
			return {
				...state,
				...action.payload.state,
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
		case "end-game":
			return {
				...state,
				end: true,
			};
		case "reset-game":
			const resetState = generateInitState();
			return resetState;
		default:
			return state;
	}
}
