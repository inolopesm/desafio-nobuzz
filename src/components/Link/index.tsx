import {
  Link as LinkPrimitive,
  LinkProps as LinkPrimitiveProps,
} from "react-router-dom";

import styles from "./styles.module.css";
import classNames from "../../utils/classNames";

export interface LinkProps extends LinkPrimitiveProps {}

export default function Link({ className, ...props }: LinkPrimitiveProps) {
  return (
    <LinkPrimitive className={classNames(styles.link, className)} {...props} />
  );
}
