export default function Screen({ board, score }) {
	return (
		<table className="game-screen">
			<tbody>
				{board.map((row, r) => (
					<tr key={"row-" + r}>
						{row.map((cell, c) => (
							<td
								key={"col-" + c}
								style={{
									backgroundColor: cell.body
										? "grey"
										: cell.food
										? "#F24236"
										: cell.head
										? "green"
										: "transparent",
									color: "white",
								}}
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
