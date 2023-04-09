import React from "react"

const Memo: React.FC<{ step: number; companyName: string }> = ({ step, companyName }) => {
    switch (step) {
        case 0:
            return (
                <>
                    <span className="material-symbols-rounded">avg_pace</span>
                    <h1>Maximize Your Potential: Create a Professional Profile in Seconds</h1>
                    <p>
                        Let's start with the forefront of your Profile, the image. Use an image that
                        represents your business or brand.
                    </p>
                </>
            )
        case 1:
            return (
                <>
                    <span className="material-symbols-rounded">badge</span>
                    <h1>What's your Profile called?</h1>
                    <p>Give your Profile a title that best represents your business/company.</p>
                </>
            )
        case 2:
            return (
                <>
                    <span className="material-symbols-rounded">open_in_new</span>
                    <h1>Where should visitors head to?</h1>
                    <p>Please enter your company's website, or a social media link.</p>
                </>
            )
        case 3:
            return (
                <>
                    <span className="material-symbols-rounded">contact_support</span>
                    <h1>How should visitors contact {companyName || "you"}?</h1>
                    <p>Please enter a relevant phone number, or email address.</p>
                </>
            )
        case 4:
            return (
                <>
                    <span className="material-symbols-rounded">help</span>
                    <h1>Tell visitors about {companyName || "your Profile Listing"}</h1>
                    <p>Please provide a description for {companyName || "your Profile Listing"}.</p>
                </>
            )
        case 5:
            return (
                <>
                    <span className="material-symbols-rounded">partner_exchange</span>
                    <h1>Are you hiring?</h1>
                    <p>If Yes, please provide a salary range and employment type.</p>
                </>
            )
        case 6:
            return (
                <>
                    <span className="material-symbols-rounded">done_all</span>
                    <h1>Listing Complete.</h1>
                    <p>
                        Let's link your Profile Listing to you, giving you special access to edit
                        it. These details will not be shown to the public.
                    </p>
                </>
            )
        default:
            return <></>
    }
}

export default Memo
