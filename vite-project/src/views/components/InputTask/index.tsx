import React, { useEffect, useRef, useState } from "react";
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
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    className={styles.inputTaskCheckbox}
                    disabled={isEditMode}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        if (e.target.checked) {
                            setTimeout(() => {
                                onDone(id);
                            }, 500);
                        }
                    }}
                />
                {isEditMode ? (
                    <input
                        className={styles.inputTaskTitleEdit}
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onEdited(id, value);
                                setIsEditMode(false);
                            }
                        }}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
            </label>
            {isEditMode ? (
                <button
                    className={styles.inputTaskSave}
                    aria-label="Save"
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false);
                    }}
                />
            ) : (
                <button
                    className={styles.inputTaskEdit}
                    aria-label="Edit"
                    onClick={() => {
                        setIsEditMode(true);
                    }}
                />
            )}
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
