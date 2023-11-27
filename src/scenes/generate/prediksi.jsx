"use client";
import React, { useRef } from "react";
import { Label, TextInput } from "flowbite-react";
import CardProduct from "../../components/CardProduct";
import { useState } from "react";
function Prediksi() {
  const userInputRef = useRef();

  const [userId, setUserId] = useState(null);
  const [prediksi, setPrediksi] = useState(false);
  const handleGenerate = () => {
    const userIdValue = userInputRef.current.value;
    setUserId(userIdValue);
    console.log(userIdValue);
    // Lakukan sesuatu dengan nilai userIdValue, misalnya kirim ke server, dll.
  };
  return (
    <div>
      <div className="h-4/5 relative block my-8">
        <div className="title-landing flex justify-center">
          <p className="font-extrabold text-center w-1/2 text-2xl">
            Prediksi Product Tools AI - Smart Store
          </p>
        </div>

        <div className="flex justify-center my-8">
          <form class="max-w-sm mx-auto flex ">
            <input
              type="text"
              ref={userInputRef}
              id="user_id"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-90"
              placeholder="Masukan User id : 155790"
            />
            <button
              type="button"
              onClick={handleGenerate}
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 flex items-center mx-6"
            >
              Generate
            </button>
          </form>
        </div>

        {userId && (
          <div>
            <p className="font-extrabold text-xl">User Previos Orders</p>
            <div>
              <p className="font-semibold text-lg">Order Number : 355146 </p>
              <div className="grid grid-cols-4 gap-8  mx-auto my-8">
                <>
                  <CardProduct
                    title={"Almond Breeze"}
                    description={
                      "Unsweetened Original Almond Breeze Almond Milk"
                    }
                    image={
                      "https://m.media-amazon.com/images/I/81Reo5stUJL._SX679_PIbundle-12,TopRight,0,0_AA679SH20_.jpg"
                    }
                  />
                  <CardProduct
                    title={"Soap"}
                    description={"Sensitive Skin Moisturizing Cream Soap Bars"}
                    image={
                      "https://m.media-amazon.com/images/I/71S68KwOFUL._SX679_.jpg"
                    }
                  />
                  <CardProduct
                    title={"Cereal"}
                    image={
                      "https://images-na.ssl-images-amazon.com/images/I/51iK6YKY4tL._SX300_SY300_QL70_FMwebp_.jpg"
                    }
                    description={
                      "Honey Bunches Of Oats Roasted Cereal Cereal Cereal"
                    }
                  />
                  <CardProduct
                    title={"Pancake Mix"}
                    image={
                      "https://www.simplyrecipes.com/thmb/yNaovEQ4pRuusa-qHs-9SLtuZGs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Pancake-Mix-LEAD-08-a65e8184e74542a6b0ecac9dedd9decc.jpg"
                    }
                    description={
                      "Simple Mills Almond Flour Pancake & Waffle Mix"
                    }
                  />
                </>
              </div>
            </div>
            <div className="mx-auto w-full flex justify-center ">
              <button
                type="button"
                onClick={() => {
                  setPrediksi(true);
                }}
                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 flex items-center"
              >
                Prediksi
              </button>
            </div>
          </div>
        )}

        {prediksi && (
          <div>
            <p className="font-extrabold text-xl">
              Some Suggestions To Your New Order :
            </p>
            <div className="grid grid-cols-4 gap-8  mx-auto my-8">
              <>
                <CardProduct
                  title={"Granola"}
                  description={"Nature's Path Organic Vanilla Almond Granola"}
                  image={
                    "https://nadiashealthykitchen.com/wp-content/uploads/2023/02/high-protein-vegan-granola_7-min.jpg"
                  }
                />
                <CardProduct
                  title={"Smoothie Mix"}
                  description={
                    "Orgain Organic Protein Almond Milk Smooth Chocolate"
                  }
                  image={
                    "https://www.cubesnjuliennes.com/wp-content/uploads/2022/02/Mixed-Berry-Smoothie-1.jpg"
                  }
                />
                <CardProduct
                  title={"Oatmeal"}
                  image={
                    "https://www.eatingwell.com/thmb/uqTftLVNd2XUEXrP1SUwvGEk1k4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/61111401-a00efff0a71d4c09ad365021645d3a7b.jpg"
                  }
                  description={
                    "Bob's Red Mill Gluten-Free Oatmeal Cup with Almond Milk"
                  }
                />
                <CardProduct
                  title={"Pancake Mix"}
                  image={
                    "https://www.simplyrecipes.com/thmb/yNaovEQ4pRuusa-qHs-9SLtuZGs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Pancake-Mix-LEAD-08-a65e8184e74542a6b0ecac9dedd9decc.jpg"
                  }
                  description={"Simple Mills Almond Flour Pancake & Waffle Mix"}
                />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediksi;
