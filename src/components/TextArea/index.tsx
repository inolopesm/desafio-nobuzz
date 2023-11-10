import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea className={classNames(styles.textarea, className)} {...props} />
  );
}
