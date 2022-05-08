export default function ControllerButton({ className, icon, onClick }) {
	return (
		<span
			className={className}
			onClick={onClick}
			style={{ fontSize: "3em", margin: "0.25em" }}
		>
			{icon}
		</span>
	);
}
