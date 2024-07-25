
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { ProductReview } from "./ProductReview";
import { useState } from "react";

export const ShowReviews = (props) => {
    const{reviews} = props;
    const [allReviews, setAllReviews] = useState(false);
    return (
        <>
            {!allReviews && (
                          <div className="ease-linear duration-200">
                            {reviews?.length > 0 && (
                              <ProductReview
                                ratingReview={reviews[0]}
                              />
                            )}
                            {reviews?.length > 1 && (
                              <ProductReview
                                ratingReview={reviews[0]}
                              />
                            )}
                            <button
                              onClick={() => setAllReviews(true)}
                              className="flex justify-center items-center w-full "
                            >
                              <FaChevronDown className="lg:text-2xl text-md" />
                            </button>
                          </div>
                        )}
                        {allReviews && (
                          <div className="ease-out duration-300">
                            {reviews.map((ratingReview) => (
                              <ProductReview
                                key={ratingReview._id}
                                ratingReview={ratingReview}
                              />
                            ))}
                            <button
                              onClick={() => setAllReviews(false)}
                              className="flex justify-center items-center w-full "
                            >
                              <FaChevronUp className="lg:text-2xl text-md" />
                            </button>
                          </div>
                        )}
        </>
    )
}