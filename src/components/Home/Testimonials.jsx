import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";
import { testimonials } from "../../data/HomeData";

const Testimonials = () => {
  return (
    <div className="h-full py-5 px-4 md:px-10 lg:px-24 bg-orange-50">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-center">
        Why choose us?
      </h1>
      <div className="h-[13rem] lg:h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default Testimonials;