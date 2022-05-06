export default function Screen({ board }) {
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
										? "red"
										: cell.head
										? "green"
										: "transparent",
								}}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
