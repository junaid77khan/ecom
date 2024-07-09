const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-yellow-500 text-lg">
          ★
        </span>
      ))}
      {halfStar && <span className="text-yellow-500 text-lg">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i + fullStars + 1} className="text-gray-300 text-lg">
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
