import { MotionProps, motion } from "framer-motion";
export default function SectionWrapper({
	children,
	className,
	motionProps = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 1 },
		transition: { duration: 2 },
	},
}: {
	children: any;
	className: string;
	motionProps?: MotionProps;
}) {
	return (
		<motion.section
			className={className}
			{...motionProps}>
			{children}
		</motion.section>
	);
}
