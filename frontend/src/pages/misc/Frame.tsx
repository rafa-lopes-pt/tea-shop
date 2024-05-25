import React from "react";

export default function Frame() {
	return (
		<div className="frame">
			<div className=" frame__corner frame__corner--top-left"></div>
			<div className=" frame__corner frame__corner--bottom-right"></div>
			{/* Top lines */}
			{Array(15)
				.fill("")
				.map((e, i) => (
					<div
						className={"frame__line frame__line--top"}
						key={"frame__line--top-" + i}></div>
				))}
			{/* Bottom lines */}
			{Array(12)
				.fill("")
				.map((e, i) => (
					<div
						className={"frame__line frame__line--bottom"}
						key={"frame__line--bottom-" + i}></div>
				))}

			{/* Corner Dots */}
			<div className="frame__dots">
				<div className="frame__dots__dot"></div>
				{Array(48)
					.fill("")
					.map((e, i) => (
						<div
							className={"frame__dots frame__dots__dot"}
							key={"frame__dots__dot-" + i}></div>
					))}
			</div>
		</div>
	);
}
