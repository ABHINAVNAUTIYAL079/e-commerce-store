import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}{" "}
        </Message>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem]"
        >
          {products?.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <SwiperSlide key={_id}>
                {" "}
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p>₹ {price}</p>

                    <br />

                    <p className="w-[25rem]">
                      {description?.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="flex justify-between w-[20rem]">
                    <div>
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-[#0F766E]" />
                        Brand: {brand}
                      </h1>

                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-[#0F766E]" />
                        Added: {moment(createdAt).fromNow()}
                      </h1>

                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-[#0F766E]" />
                        Reviews: {numReviews}
                      </h1>
                    </div>

                    <div>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-[#0F766E]" />
                        Ratings: {Math.round(rating)}
                      </h1>

                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-[#0F766E]" />
                        Quantity: {quantity}
                      </h1>

                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-[#0F766E]" />
                        In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ProductCarousel;
