import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 group">
      <section className="relative overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 z-10 bg-[#5EEAD4] text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
            src={p.image}
            alt={p.name}
            style={{ height: "200px" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-lg font-semibold text-[#1F2937] truncate w-[65%] group-hover:text-[#0F766E] transition-colors duration-200" title={p?.name}>
            {p?.name}
          </h5>

          <p className="text-[#0F766E] font-bold text-lg whitespace-nowrap">
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="mb-4 font-normal text-sm text-gray-500 line-clamp-2 h-[2.5rem]">
          {p?.description}
        </p>

        <section className="flex justify-between items-center mt-4">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-center text-white bg-[#0F766E] rounded-full hover:bg-[#0d6d66] transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-[#5EEAD4] focus:outline-none"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2.5 bg-gray-50 text-[#1F2937] hover:bg-[#0F766E] hover:text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-opacity-50 shadow-sm hover:shadow"
            onClick={() => addToCartHandler(p, 1)}
            title="Add to Cart"
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
