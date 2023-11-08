import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: ButtonProps) {
  return <button className={classNames(styles.button, className)} {...props} />;
}
