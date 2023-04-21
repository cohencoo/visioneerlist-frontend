import React from "react"

const Memo: React.FC<{ step: number; companyName: string }> = ({ step, companyName }) => {
    switch (step) {
        case 0:
            return (
                <>
                    <span className="material-symbols-rounded">avg_pace</span>
                    <h1>
                        Maximize Your Potential: Create a Professional Profile Listing in Seconds
                    </h1>
                    <p>
                        Let's start with the forefront of your Listing, the image. Use an image that
                        represents your business or brand.
                    </p>
                </>
            )
        case 1:
            return (
                <>
                    <span className="material-symbols-rounded">badge</span>
                    <h1>What's your Listing called?</h1>
                    <p>
                        Give your Profile Listing a title that best represents your
                        business/company.
                    </p>
                </>
            )
        case 2:
            return (
                <>
                    <span className="material-symbols-rounded">open_in_new</span>
                    <h1>Where should visitors head to?</h1>
                    <p>(Optional) - Please enter your company's website, or a social media link.</p>
                </>
            )
        case 3:
            return (
                <>
                    <span className="material-symbols-rounded">help</span>
                    <h1>How should visitors contact {companyName || "you"}?</h1>
                    <p>(Optional) - Please enter a relevant phone number, or email address.</p>
                </>
            )
        case 4:
            return (
                <>
                    <span className="material-symbols-rounded">history_edu</span>
                    <h1>Tell visitors about {companyName || "your Profile Listing"}</h1>
                    <p>
                        Here you've got the tools to showcase{" "}
                        {companyName || "your Profile Listing"}. Write in the description editor to
                        attract visitors in an instant.
                    </p>
                </>
            )
        case 5:
            return (
                <>
                    <span className="material-symbols-rounded">gallery_thumbnail</span>
                    <h1>Showcase what {companyName || "your Profile Listing"} offers</h1>
                    <p>
                        (Optional) - Let your visitors see what you have to offer. Upload up to 3
                        images that showcase your work, services, or products.
                    </p>
                </>
            )
        case 6:
            return (
                <>
                    <span className="material-symbols-rounded">partner_exchange</span>
                    <h1>Are you hiring?</h1>
                    <p>(Optional) - If Yes, please provide a salary range and employment type.</p>
                </>
            )
        case 7:
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
