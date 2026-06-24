import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 group">
      <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="h-[12rem] w-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-sm font-semibold text-[#1F2937] group-hover:text-[#0F766E] transition-colors duration-200 truncate w-[70%]" title={product.name}>
              {product.name}
            </div>
            <span className="bg-[#5EEAD4] text-[#0F766E] text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
