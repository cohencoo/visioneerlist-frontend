import styles from "./ImageViewer.module.scss"
let modal: HTMLDivElement
let image: HTMLImageElement

const isFileImage = ({ fileName }: { fileName: string }) => {
    fileName = fileName.split("/").pop() || "false"
    const imagesExtension = ["png", "jpg", "jpeg", "gif", "bmp", "webp"]
    if (imagesExtension.indexOf(fileName) !== -1) return true
    else return false
}

export const ImageViewer = function (img: string, format: string): void {
    if (!isFileImage({ fileName: format })) {
        window.open(img, "_blank")
        return
    }
    ;[modal, image] = [document.createElement("div"), document.createElement("img")]
    modal.className = styles.ImageViewer
    image.src = img
    image.onload = () => image.classList.add(styles.loaded)

    document.body.appendChild(modal)
    modal.appendChild(image)

    modal.onclick = () => {
        image.classList.remove(styles.loaded)
        setTimeout(() => {
            document.body.removeChild(modal)
        }, 200)
    }
}
