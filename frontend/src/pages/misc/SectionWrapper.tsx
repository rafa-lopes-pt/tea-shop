import { motion } from "framer-motion";
export default function SectionWrapper({
	children,
	className,
}: {
	children: any;
	className: string;
}) {
	return (
		<motion.section
			className={className}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2 }}
			exit={{ opacity: 0 }}>
			{children}
		</motion.section>
	);
}
