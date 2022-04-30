export default function generateEmptyBoard(size = 10) {
	// check if size of the board is ok:
	if (size < 10) {
		alert(
			"The board of size: " +
				size +
				" will be to small... Pass bigger board size!"
		);
		return;
	}
	// create empty board:
	let board = [];
	for (let r = 0; r < size; r++) {
		board[r] = [];
		for (let c = 0; c < size; c++) {
			board[r][c] = {
				body: false,
				food: false,
				head: false,
			};
		}
	}
	return board;
}
