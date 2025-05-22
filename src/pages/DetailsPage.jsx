import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Dot } from "lucide-react";
import { motion } from "framer-motion";

function DetailsPage() {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("details");

  if (!item) return <div>Item not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top banner with image */}
      <div className="relative bg-red-600 rounded-b-[40px] flex justify-center items-center h-64">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white"
        >
          <ArrowLeft size={24} />
        </button>

        <motion.img
          layoutId={`food-img-${item.id}`}
          src={item.imageUrl}
          alt={item.name}
          className="h-36 object-contain"
        />
      </div>

      {/* Info section */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
          <span className="text-lg text-red-600 font-semibold">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500">{item.category}</p>

        {/* Tabs */}
        <div className="flex gap-4 mt-2">
          <button
            className={`px-4 py-1 rounded-full font-medium text-sm ${
              tab === "details"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setTab("details")}
          >
            Details
          </button>
          <button
            className={`px-4 py-1 rounded-full font-medium text-sm ${
              tab === "reviews"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setTab("reviews")}
          >
            Reviews
          </button>
        </div>

        {tab === "details" ? (
          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
            {item.description}
          </p>
        ) : (
          <ul className="mt-2 text-sm text-gray-700">
            {item.reviews.map((r, idx) => (
              <li key={idx} className="flex items-center gap-2 mb-1">
                <Dot size={20} /> <strong>{r.user}:</strong> {r.comment}
              </li>
            ))}
          </ul>
        )}

        {/* Quantity + Add to Cart */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="bg-red-600 text-white w-8 h-8 flex items-center justify-center"
            >
              -
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="bg-red-600 text-white w-8 h-8 flex items-center justify-center"
            >
              +
            </button>
          </div>

          <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
