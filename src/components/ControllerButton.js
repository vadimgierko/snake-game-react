export default function ControllerButton({ className, icon, onClick }) {
	return (
		<span className={className} onClick={onClick}>
			{icon}
		</span>
	);
}
