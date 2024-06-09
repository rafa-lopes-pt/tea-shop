
export default function Frame() {
	return (
		<div className="frame">
			<div className=" frame__corner frame__corner--top-left">
				{/* Top lines */}

				{Array(13)
					.fill("")
					.map((e, i) => (
						<div
							className={"frame__line frame__line--top"}
							key={"frame__line--top-" + i}></div>
					))}
			</div>
			<div className=" frame__corner frame__corner--bottom-right"></div>
			{/* Bottom lines */}
			<div className="bottom-lines">{
				Array(12)
					.fill("")
					.map((e, i) => (
						<div
							className={"frame__line frame__line--bottom"}
							key={"frame__line--bottom-" + i}></div>
					))}
			</div>


			{/* Corner Dots */}
			<div className="frame__dots">
				<div className="frame__dots__dot"></div>
				{Array(48)
					.fill("")
					.map((e, i) => (
						<div
							className={"frame__dots__dot"}
							key={"frame__dots__dot-" + i}></div>
					))}
			</div>
		</div>
	);
}
