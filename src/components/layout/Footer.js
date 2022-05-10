export default function Footer({
	releaseYear = new Date().getFullYear(), // default value = current year
	links = [],
}) {
	return (
		<footer>
			<Copyright releaseYear={releaseYear} />{" "}
			{links.map((link, l) => (
				<span key={"footer-link-" + l}>
					<FooterLink label={link.label} link={link.link} />{" "}
					{l < links.length - 1 ? " | " : null}
				</span>
			))}
		</footer>
	);
}

// default link opens in a new window
function FooterLink({ label, link }) {
	return (
		<a href={link} target="_blank" rel="noreferrer">
			{label}
		</a>
	);
}

// Copyright component gets current year automatically &
// adds current year to the release year if not same
function Copyright({ releaseYear }) {
	const currentYear = new Date().getFullYear();
	return (
		<span>
			&copy; {releaseYear}
			{currentYear === releaseYear ? null : "-" + currentYear}
		</span>
	);
}
