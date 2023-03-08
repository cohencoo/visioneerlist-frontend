export function readableDateTime(time: any) {
    const now = new Date();
    const diff = Number(now) - time;
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes === 1) return "1 minute ago";
    if (diffInHours < 1) return `${diffInMinutes} minutes ago`;
    if (diffInHours === 1) return "1 hour ago";
    if (diffInDays < 1) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return "1 day ago";
    if (diffInWeeks < 1) return `${diffInDays} days ago`;
    if (diffInWeeks === 1) return "1 week ago";
    if (diffInMonths < 1) return `${diffInWeeks} weeks ago`;
    if (diffInMonths === 1) return "1 month ago";
    if (diffInYears < 1) return `${diffInMonths} months ago`;
    if (diffInYears === 1) return "1 year ago";
    return `${diffInYears} years ago`;
}

export function fixURL(URL: any) {
    if (URL?.includes("http://") || URL?.includes("https://")) return URL;
    else return "https://" + URL;
}
