import classNames from "../../../utils/classNames";
import styles from "./styles.module.css";

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={classNames(styles.cardBody, className)} {...props} />;
}
