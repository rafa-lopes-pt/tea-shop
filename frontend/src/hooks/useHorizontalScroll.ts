import { WheelEvent, useEffect, useRef } from "react";
/**
 * Creates a ref and a wheel event listener for horizontal scrolling
 * @param factor adjust the scroll speed
 */
export default function useHorizontalScroll<E extends HTMLElement>(
	factor: number = 3
) {
	const elRef = useRef<E>(null);
	useEffect(() => {
		const el = elRef.current;
		if (el) {
			const onWheel = (e: WheelEvent<E>) => {
				if (e.deltaY == 0) e.preventDefault();
				el!.scrollTo({
					left: el!.scrollLeft + e.deltaY * factor,
					behavior: "smooth",
				});
			};
			el.addEventListener("wheel", onWheel as unknown as EventListener);
			return () =>
				el.removeEventListener(
					"wheel",
					onWheel as unknown as EventListener
				);
		}
	}, []);
	return elRef;
}
