import React from "react";
import CardProduct from "../../components/CardProduct";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
const Rekomendasi = () => {
  const { control, handleSubmit, setValue, watch, getValues } = useForm();

  const [name] = getValues(["name"]);
  const [select, setSelect] = useState(null);
  const options = [
    {
      value: "Unsweetened Original Almond Breeze Almond Milk",
      label: "Unsweetened Original Almond Breeze Almond Milk",
    },
    {
      value: "Honey Bunches Of Oats Roasted Cereal",
      label: "Honey Bunches Of Oats Roasted Cereal",
    },
    {
      value: "Dentastix Fresh, Large",
      label: "Dentastix Fresh, Large",
    },
    {
      value: "Bathroom Tissue Double Rolls",
      label: "Bathroom Tissue Double Rolls",
    },
    {
      value: "Sensitive Skin Moisturizing Cream Soap Bars",
      label: "Sensitive Skin Moisturizing Cream Soap Bars",
    },
    {
      value: "Regular Pork Sausage Tube",
      label: "Regular Pork Sausage Tube",
    },
  ];

  useEffect(() => {
    console.log(select);
  }, [select]);
  return (
    <div>
      <div className="h-4/5 relative block my-8">
        <div className="title-landing flex justify-center">
          <p className="font-extrabold text-center w-1/2 text-2xl">
            Rekomendasi Product Tools AI - Smart Store
          </p>
        </div>

        <div className="flex justify-center">
          <p className="font-normal w-1/4 my-5">
            <Select
              name="name"
              className="basic-single"
              classNamePrefix="select"
              isDisabled={false}
              isClearable={true}
              isSearchable={true}
              onChange={(val) => setSelect(val.value)}
              options={options}
            />
          </p>
        </div>
        {select && (
          <div className="grid grid-cols-4 gap-8  mx-auto my-8">
            {select === "Unsweetened Original Almond Breeze Almond Milk" && (
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
            )}
            {select === "Honey Bunches Of Oats Roasted Cereal" && (
              <CardProduct
                title={"Large Lemon"}
                image={
                  "https://m.media-amazon.com/images/I/81c2j4kWugL._AC_UL480_FMwebp_QL65_.jpg"
                }
              />
            )}
            {select === "Dentastix Fresh, Large" && (
              <CardProduct
                title={"Organic Avocado"}
                image={
                  "https://learnenglishteens.britishcouncil.org/sites/teens/files/styles/article/public/rs7776_thinkstockphotos-856586464_1-low.jpg?itok=zHdfQ6Ij"
                }
              />
            )}
            {select === "Bathroom Tissue Double Rolls" && (
              <CardProduct
                title={"Organic Baby spinch"}
                image={
                  "https://m.media-amazon.com/images/I/61dezrJv2TL._AC_UL480_FMwebp_QL65_.jpg"
                }
              />
            )}
            {select === "Regular Pork Sausage Tube" && <></>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rekomendasi;
