import { Link } from "react-router-dom";
import HeartIcon from "../../pages/Products/HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative group">
      <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] h-[20rem] object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold text-[#1F2937] group-hover:text-[#0F766E] transition-colors duration-200">{product.name}</div>
            <span className="bg-[#5EEAD4] text-[#0F766E] text-sm font-bold mr-2 px-3 py-1 rounded-full shadow-sm">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
