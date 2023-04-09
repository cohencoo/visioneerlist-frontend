import React from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    message: string[]
    verifying: boolean
    icon: any
    action: () => void
}

const Button: React.FC<ButtonProps> = ({ message, icon, verifying, action }) => {
    const [defaultText, activeText] = message
    return (
        <button
            className={styles.Button}
            onClick={() => (!verifying ? action() : null)}
            style={{ background: verifying ? "#99601010" : undefined }}>
            {verifying ? (
                <div className={styles.verifying}>
                    <div className={styles.loader}></div>
                    {activeText}
                </div>
            ) : (
                <>
                    {icon && <span className="material-symbols-rounded">{icon}</span>}
                    {defaultText}
                </>
            )}
        </button>
    )
}

export default Button
