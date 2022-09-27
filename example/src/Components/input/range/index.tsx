import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

interface InputRangeProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export const InputRange = ({
  min,
  max,
  value,
  step = 1,
  setValue,
}: InputRangeProps) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className={styles.slider}
        />
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          className={styles.value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>
    </>
  );
};
