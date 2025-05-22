import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockMenuItems, themeColor } from "../constant";
import { Search } from "lucide-react";
import FoodFlexCard from "../components/FoodFlexCard";
import { useLocation } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tableNumber = query.get("table") || "1"; // fallback to 1 if missing
  const [inputVal, setInputVal] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [categories, setCategories] = useState([
    "All",
    "Drinks",
    "Main",
    "Dessert",
  ]);
  const [highlightedCategory, setHighlightedCategory] = useState("All");
  const [isHeaderSmall, setIsHeaderSmall] = useState(false);

  useEffect(() => {
    const targetSection = document.getElementById("menu-title-section");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderSmall(!entry.isIntersecting);
      },
      {
        threshold: 1.0,
        rootMargin: "0px 0px -120px 0px",
      }
    );
    if (targetSection) observer.observe(targetSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: themeColor.secondaryColor,
      }}
      className="w-full flex-1"
    >
      <header
        style={{
          backgroundColor: themeColor.primaryColor,
          color: "#fff",
          fontStyle: isHeaderSmall ? "normal" : "italic",
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "all 0.2s ease-in-out",
          height: isHeaderSmall ? "38px" : "120px",
          fontSize: isHeaderSmall ? "18px" : "24px",
          justifyContent: isHeaderSmall ? "start" : "center",
        }}
        className="w-full px-10 flex font-bold  items-center"
      >
        {isHeaderSmall ? `#${tableNumber}` : ` CAJUN`}
      </header>

      <section className="p-10" id="menu-title-section">
        <div
          className="font-semibold"
          style={{ fontStyle: "italic", fontSize: 20 }}
        >
          Order for table{" "}
          <span style={{ color: themeColor.primaryColor }}>
            {" "}
            number: {tableNumber}
          </span>{" "}
        </div>
      </section>

      <section>
        <div className="mx-6 relative">
          <input
            className="w-full rounded-full px-4 py-3 outline-none"
            placeholder="Search"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div
            style={{
              right: 16,
              transform: isFocused
                ? "rotateZ(90deg) scale(1)"
                : "rotateZ(0deg) scale(0.88)",
              transition: "all 0.1s linear",
            }}
            className="top-0 flex justify-center items-center absolute h-full"
          >
            <Search
              style={{ transition: "all 0.1s linear" }}
              opacity={isFocused ? 0.7 : 0.3}
              color={themeColor.primaryColor}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-row overflow-x-scroll mt-6 py-3 pl-10 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => setHighlightedCategory(category)}
            style={{
              transition: "all .1s linear",
              backgroundColor:
                highlightedCategory === category
                  ? themeColor.primaryColor
                  : themeColor.secondaryColor,
              color:
                highlightedCategory === category
                  ? "white"
                  : themeColor.fontColor,
              borderColor:
                highlightedCategory === category
                  ? themeColor.primaryColor
                  : themeColor.fontColor,
            }}
            className="border font-semibold flex justify-center items-center px-3 py-1 rounded-2xl cursor-pointer"
          >
            {category}
          </div>
        ))}
      </section>

      <section
        style={{
          backgroundColor: themeColor.secondaryColor,
        }}
        className="grid grid-cols-2 gap-4 px-10 mt-6"
      >
        {mockMenuItems
          .filter(
            (item) =>
              highlightedCategory === "All" ||
              item.category === highlightedCategory
          )
          .filter((item) =>
            item.name.toLowerCase().includes(inputVal.toLowerCase())
          )
          .map((item) => (
            <FoodFlexCard key={item.id} item={item} />
          ))}
      </section>
    </div>
  );
}

export default MenuPage;
