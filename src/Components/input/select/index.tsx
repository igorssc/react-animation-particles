import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

interface InputSelectProps {
  items: string[];
  defaultValue: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const InputSelect = ({
  items,
  defaultValue,
  setValue,
}: InputSelectProps) => {
  return (
    <>
      <div className={styles.container}>
        <select
          defaultValue={defaultValue}
          onChange={(e) => setValue(e.target.value)}
        >
          {items.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
