import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

interface InputColorProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>> | ((value: string) => void);
}

export const InputColor = ({ color, setColor }: InputColorProps) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type="color"
          className={styles.color}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          pattern="#[a-f0-9]{6}"
        />
      </div>
    </>
  );
};
