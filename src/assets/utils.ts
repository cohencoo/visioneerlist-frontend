export const toastStyles = {
    borderRadius: "10px",
    background: "var(--shade-2)",
    color: "#fff"
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "auto"
    })
}

export function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export const capitalize = (text: string) =>
    text
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
export const roundTo = (num: number, places: number) =>
    +(Math.round(Number(String(num) + "e+" + places)) + "e-" + places)
export const randomFromRange = (min: number, max: number) => Math.random() * (max - min) + min

export function readableDateTime(time: any) {
    const now = new Date()
    const diff = Number(now) - time
    const diffInMinutes = Math.floor(diff / 1000 / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInWeeks = Math.floor(diffInDays / 7)
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes === 1) return "1 minute ago"
    if (diffInHours < 1) return `${diffInMinutes} minutes ago`
    if (diffInHours === 1) return "1 hour ago"
    if (diffInDays < 1) return `${diffInHours} hours ago`
    if (diffInDays === 1) return "1 day ago"
    if (diffInWeeks < 1) return `${diffInDays} days ago`
    if (diffInWeeks === 1) return "1 week ago"
    if (diffInMonths < 1) return `${diffInWeeks} weeks ago`
    if (diffInMonths === 1) return "1 month ago"
    if (diffInYears < 1) return `${diffInMonths} months ago`
    if (diffInYears === 1) return "1 year ago"
    return `${diffInYears} years ago`
}

export function fixURL(URL: any) {
    if (URL?.includes("http://") || URL?.includes("https://")) return URL
    else return "https://" + URL
}

export function compression(imageSize: any, targetSizeMB: any) {
    const targetSizeBytes = targetSizeMB * 1000000 // 1MB = 1000000 bytes
    if (imageSize <= targetSizeBytes) return 1

    return targetSizeBytes / imageSize
}

export function compress(
    dataUrl: any,
    scaleRatio: any,
    imageArguments: any,
    imageType: any,
    callback: any
) {
    let image: CanvasImageSource, oldWidth, oldHeight, newWidth, newHeight, canvas, ctx, newDataUrl
    imageType = imageType || "image/jpeg"
    imageArguments = imageArguments || 1
    image = new Image()
    image.onload = function () {
        oldWidth = image.width
        oldHeight = image.height
        newWidth = Math.floor(Number(oldWidth) * scaleRatio)
        newHeight = Math.floor(Number(oldHeight) * scaleRatio)
        canvas = document.createElement("canvas")
        canvas.width = newWidth
        canvas.height = newHeight
        ctx = canvas.getContext("2d")
        ctx?.drawImage(image, 0, 0, newWidth, newHeight)
        newDataUrl = canvas.toDataURL(imageType, imageArguments)
        callback(newDataUrl)
    }
    image.src = dataUrl
}
