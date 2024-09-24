function LeadingIcon(props: React.SVGProps<SVGSVGElement>) {
	const { fill, ...rest } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="130"
			height="130"
			fill="none"
			viewBox="0 0 150 150"
			{...rest}
		>
			<path
				fill="#E5B23C"
				d="M118.75 56.25a43.75 43.75 0 10-68.588 36L31.25 125l14.1.581L52.9 137.5l21.663-37.525L75 100c.219.013.287-.019.438-.025L97.1 137.5l7.7-11.662 13.95-.838-18.912-32.75a43.686 43.686 0 0018.912-36zm-75 0a31.25 31.25 0 1162.5 0 31.25 31.25 0 01-62.5 0z"
			></path>
			<path
				fill="#E5B23C"
				d="M75 75c10.355 0 18.75-8.395 18.75-18.75S85.355 37.5 75 37.5s-18.75 8.395-18.75 18.75S64.645 75 75 75z"
			></path>
		</svg>
	);
}

export default LeadingIcon;
