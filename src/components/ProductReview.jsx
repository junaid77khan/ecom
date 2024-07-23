/* eslint-disable react/prop-types */
const ProductReview = (props) => {
    const { ratingReview } = props
    return (
        <div className="border-t border-gray-300 pt-4 m-4">
            <div className="flex items-center mb-2">
                <div className="lg:text-lg text-md font-bold text-gray-800 mr-2">
                    {ratingReview?.name}
                </div>
                <div className="text-yellow-500">
                    {Array(ratingReview?.rating)
                        .fill("★")
                        .join("")}
                </div>
            </div>
            <p className="text-gray-700 lg:text-md text-sm">
                {ratingReview?.review}
            </p>
        </div>
    )
}

export { ProductReview }












