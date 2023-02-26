import React, { useState } from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
    const [checked, setChecked] = useState(false);
    return (
        <div className={styles.inputTask}>
            <label>
                <input
                    className={styles.inputTaskCheckbox}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        if (e.target.checked) {
                            onDone(id);
                        }
                    }}
                />
                <h3 className={styles.inputTaskTitle}>{title}</h3>
            </label>
            <button className={styles.inputTaskEdit} aria-label="Edit" />
            <button
                className={styles.inputTaskRemove}
                aria-label="Remove"
                onClick={() => {
                    if (confirm("Are you sure?")) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    );
};
