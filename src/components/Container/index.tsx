import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container({ className, ...props }: ContainerProps) {
  return <div className={classNames(styles.container, className)} {...props} />;
}
