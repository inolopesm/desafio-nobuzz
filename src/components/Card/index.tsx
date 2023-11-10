import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps) {
  return <div className={classNames(styles.card, className)} {...props} />;
}
