import { AnimatePresence, motion } from "framer-motion";
import { Ref, TextareaHTMLAttributes, forwardRef } from "react";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    invalidText?: string;
    outlined?: boolean
}

const Textarea = forwardRef(
    (
        {
            label = "",
            invalidText,
            spellCheck = true,
            className = "",
            rows = 8,
            ...props
        }: TextareaProps,
        ref: Ref<HTMLTextAreaElement>
    ) => {
        return (
            <div className={`textarea input ${props.outlined ? "input--outlined" : ""} ` + className}>
                <textarea
                    {...props}
                    ref={ref}
                    spellCheck={spellCheck}
                    className="textarea__element input__element"
                    placeholder={label}
                />
                <label
                    htmlFor={props?.id}
                    className="textarea__label input__label">
                    {label}
                </label>
                <AnimatePresence>
                    {invalidText && (
                        <motion.p
                            initial={{ opacity: 0, translateY: "100%" }}
                            animate={{
                                opacity: 1,
                                translateY: "0%",
                            }}
                            exit={{
                                opacity: 0,
                                translateY: "100%",
                            }}
                            transition={{ duration: 0.3 }}
                            className="textarea__invalid-text input__invalid-text">
                            {invalidText}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);
export default Textarea;
