"use client";
import React, { useRef } from "react";
import { Label, TextInput } from "flowbite-react";
import CardProduct from "../../components/CardProduct";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
function Prediksi() {
  const userInputRef = useRef();
  const [selectedCards, setSelectedCards] = useState([]);
  const [userId, setUserId] = useState(null);
  const [prediksi, setPrediksi] = useState(false);
  const [product, setProduct] = useState([]);
  const API_URL = "http://localhost:5000/api/recommendations";
  const [apiUrl, setApiUrl] = useState(API_URL);
  const [loading, setLoading] = useState(true);
  const handleGenerate = () => {
    const userIdValue = userInputRef.current.value;
    setUserId(userIdValue);
    console.log(userIdValue);
    // Lakukan sesuatu dengan nilai userIdValue, misalnya kirim ke server, dll.
  };

  const handleCardSelect = (id) => {
    // Toggle card selection
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleAddToCart = () => {
    // Generate URL with selected categories
    const selectedCategories = selectedCards.map((id) => {
      const product = products.find((p) => p.id === id);
      return product ? product.title : "";
    });

    const updatedUrl = `${API_URL}?category=${selectedCategories.join(
      "&category="
    )}`;
    setApiUrl(updatedUrl);

    // Perform fetch with updated URL
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let itemss = [];
        var arrayOfObjects = data.slice(0, 8).map(function (itemList) {
          return itemList.map(function (item) {
            itemss.push({
              title: item,
              imageUrl: `https://source.unsplash.com/random/?${item}&food`,
            });
            return { item };
          });
        });
        console.log(itemss);
        setProduct(itemss);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set status loading menjadi false setelah data diambil
      }
    };
    fetchDataProduct();
  }, [apiUrl]);

  const products = [
    {
      id: 1,
      title: "Large Lemon",
      description: "Ponderosa lemon is less cold-hardy than a true lemon",
      image: `https://source.unsplash.com/random/?Lemon`,
    },
    {
      id: 2,
      title: "Banana",
      description:
        "A banana is an elongated, edible fruit – botanically a berry ",
      image: `https://source.unsplash.com/random/?Banana`,
    },
    {
      id: 3,
      title: "Organic Avocado",
      description:
        "The avocado is a medium-sized, evergreen tree in the laurel family",
      image: `https://source.unsplash.com/random/?Avocado`,
    },
    {
      id: 4,
      title: "Organic Garlic",
      description:
        "It is native to South Asia, Central Asia and northeastern Iran",
      image: `https://source.unsplash.com/random/?Garlic`,
    },

    // Add other product objects
  ];

  return (
    <div>
      <div className="h-4/5 relative block my-8">
        <div className="title-landing flex justify-center">
          <p className="font-extrabold text-center w-1/2 text-2xl">
            Prediksi Product Tools AI - Smart Store
          </p>
        </div>

        <div className="title-landing flex justify-center my-8">
          <p className="font-normal text-center w-1/2 text-xl">
            Pilih Barang Yang Di Beli
          </p>
        </div>

        <div>
          <div>
            <div className="grid grid-cols-4 gap-8 mx-auto my-8">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  onSelect={handleCardSelect}
                  isSelected={selectedCards.includes(product.id)}
                />
              ))}
            </div>
          </div>
          <div className="mx-auto w-full flex justify-center ">
            <button
              type="button"
              onClick={() => {
                setPrediksi(true);
                handleAddToCart();
              }}
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 flex items-center"
            >
              Prediksi
            </button>
          </div>
        </div>

        {prediksi && (
          <div>
            <p className="font-extrabold text-xl">
              Some Suggestions To Your New Order :
            </p>
            <div className="grid grid-cols-4 gap-8  mx-auto my-8">
              {product.map(function (item) {
                return (
                  <CardProduct
                    key={item.id} // Jangan lupa tambahkan key untuk setiap elemen dalam loop
                    title={item.title}
                    description={item.description} // Gunakan properti dari objek item
                    image={item.imageUrl} // Gunakan properti dari objek item
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediksi;
