import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";

function FoodFlexCard({ item }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/details/${item.id}`, { state: { item } });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-3 relative cursor-pointer hover:scale-[1.015] transition-all"
      onClick={goToDetails}
    >
      <div className="absolute top-2 right-2">
        <Heart size={18} color="red" strokeWidth={1.5} />
      </div>

      <div className="w-full flex justify-center">
        <motion.img
          layoutId={`food-img-${item.id}`}
          src={item.imageUrl}
          alt={item.name}
          className="h-20 w-20 object-contain"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">
            ${item.price.toFixed(2)}
          </span>
          <button
            className="bg-red-600 text-white rounded-full p-1 hover:scale-105 transition"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart clicked");
            }}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodFlexCard;
