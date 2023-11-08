import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return <input className={classNames(styles.input, className)} {...props} />;
}
