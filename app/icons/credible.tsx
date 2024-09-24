function CredibleIcon(props: React.SVGProps<SVGSVGElement>) {
	const { fill, ...rest } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="130"
			height="120"
			fill="none"
			viewBox="0 0 150 144"
			{...rest}
		>
			<path
				fill="#E5B23C"
				d="M107.669 101.187l13.687 42.138-46.331-33.675 32.644-8.463zm42.331-46H92.719L75.03.681 57.281 55.2 0 55.125l46.388 33.731-17.75 54.463 46.387-33.669 28.644-20.794L150 55.188z"
			></path>
		</svg>
	);
}

export default CredibleIcon;
