import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Backdrop({ className, ...props }: BackdropProps) {
  return <div className={classNames(styles.backdrop, className)} {...props} />;
}
