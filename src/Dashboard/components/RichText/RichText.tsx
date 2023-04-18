import React from "react"
import styles from "./RichText.module.scss"
import { sanitizeInput } from "../../../assets/utils"

interface RichTextProps {
    onEdit: (html: any) => void
    initialContent?: string
}

const RichText: React.FC<RichTextProps> = ({ onEdit, initialContent }) => {
    const handleFormat = (command: string) => document.execCommand(command, false)

    const handleLink = () => {
        const url = prompt("Please enter website URL:")
        if (url) {
            const sanitizedUrl = sanitizeInput(url)
            document.execCommand("createLink", false, sanitizedUrl)
        }
    }

    const handleFormatSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFormat = event.target.value
        const formatMap: { [key: string]: string } = {
            title: "h1",
            header: "h2",
            subheader: "h3"
        }
        const format = formatMap[selectedFormat] || "p"
        document.execCommand("formatBlock", false, format)
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        const pastedText = event.clipboardData?.getData("text/plain") || ""
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = pastedText
        const plainText = tempDiv.textContent || tempDiv.innerText
        const contentWithLineBreaks = plainText.replace(/\n/g, "<br>")
        document.execCommand("insertHTML", false, contentWithLineBreaks)
    }

    return (
        <div className={styles.RichText}>
            <div className={styles.toolbar}>
                <button onClick={() => handleFormat("bold")}>
                    <b>B</b>
                </button>
                <button onClick={() => handleFormat("italic")}>
                    <i>I</i>
                </button>
                <button onClick={() => handleFormat("underline")}>
                    <u>U</u>
                </button>
                <button onClick={handleLink}>
                    <span className="material-symbols-rounded">link</span>
                </button>
                <select onChange={handleFormatSelection}>
                    <option value="">Format</option>
                    <option value="title">Title</option>
                    <option value="header">Header</option>
                    <option value="body">Body</option>
                </select>
            </div>
            <div
                className={styles.textbox}
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: initialContent || "" }}
                onBlur={(event) => onEdit(event.target)}
                onPaste={handlePaste}></div>
        </div>
    )
}

export default RichText
