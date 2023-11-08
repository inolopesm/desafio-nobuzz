import classNames from "../../../utils/classNames";
import styles from "./styles.module.css";

interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardRoot({ className, ...props }: CardRootProps) {
  return <div className={classNames(styles.card, className)} {...props} />;
}
