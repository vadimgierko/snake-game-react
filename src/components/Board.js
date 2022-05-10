export default function Board({ board, score }) {
	return (
		<table className="board">
			<tbody>
				{board.map((row, r) => (
					<tr key={"row-" + r}>
						{row.map((cell, c) => (
							<td
								className={
									cell.body
										? "board-cell body-cell"
										: cell.food
										? "board-cell food-cell"
										: cell.head
										? "board-cell head-cell"
										: "board-cell"
								}
								key={"col-" + c}
							>
								{cell.food && score + 1}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
