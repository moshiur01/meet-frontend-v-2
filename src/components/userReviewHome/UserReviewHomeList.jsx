import { HiStar } from "react-icons/hi";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAllPlatformReviewsQuery } from "../../redux/api/platformReview";
import Loading from "../Loader/Loading";

const UserReviewHomeList = () => {
  const { data, isLoading } = useAllPlatformReviewsQuery({
    limit: 100,
    page: 1,
  });

  const reviews = data?.platformReviews?.data;

  console.log(reviews);

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      {isLoading && <Loading />}

      {!isLoading && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {/* map here  */}
          {reviews?.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="py-[30px] px-5 rounded-3">
                <div className="flex items-center justify-between gap-[13px]">
                  <img
                    className="w-14 rounded-lg"
                    src={review?.userImg}
                    alt={review?.userName}
                  />
                  <div>
                    <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                      {review?.userName}
                    </h4>

                    <div className="flex items-center gap-[2px]">
                      {[...Array(review?.rating)].map((_, index) => (
                        <HiStar
                          key={index}
                          className="text-yellowColor w-18px h-5"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] w-[420px]">
                  {review?.reviewText}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default UserReviewHomeList;
