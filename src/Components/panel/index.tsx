import { ReactNode } from "react";
import styles from "./styles.module.css";

interface PanelProps {
  title: string;
  children: ReactNode;
}

export const Panel = ({ title, children }: PanelProps) => {
  return (
    <>
      <div className={styles.container}>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </>
  );
};
