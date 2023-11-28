import CardProduct from "../../components/CardProduct";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, React } from "react";
import { ClipLoader } from "react-spinners";
import { options } from "../../data/mockData";

const Rekomendasi = () => {
  const { control, handleSubmit, setValue, watch, getValues } = useForm();

  const [name] = getValues(["name"]);
  const [select, setSelect] = useState(null);
  const [product, setProduct] = useState([]);
  const API_URL = "http://localhost:5000/api/recommendations";
  const [apiUrl, setApiUrl] = useState(API_URL);
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [category3, setCategory3] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let apiUrl = API_URL;

    // Check if category1 is provided
    if (category1) {
      apiUrl += "?category=" + category1;

      // Check if both category1 and category2 are provided
      if (category2) {
        apiUrl += "&category=" + category2;
      }
    }
    setApiUrl(apiUrl);
  }, [category1, category2, category3]);

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

        <div className="title-landing flex justify-center my-4">
          <p className="font-normal text-center w-1/2 text-lg">
            Pilih Product Yang Telah Kamu Beli
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-4 my-4">
            <Select
              name="name"
              className="basic-single w-80"
              classNamePrefix="select"
              isDisabled={false}
              isClearable={true}
              isSearchable={true}
              onChange={(val) => {
                setSelect(val.value);
                setCategory1(val.value);
              }}
              placeholder={"Pilih Product"}
              options={options}
            />

            <Select
              name="category2"
              className="basic-single"
              classNamePrefix="select"
              isDisabled={false}
              isClearable={true}
              isSearchable={true}
              placeholder={"Pilih Product"}
              onChange={(val) => {
                setSelect(val.value);
                setCategory2(val.value);
              }}
              options={options}
            />
          </div>
        </div>
        {select &&
          (loading ? (
            <ClipLoader color="#36d7b7" />
          ) : (
            <div>
              <p className="font-semibold text-lg">Orang lain juga membeli:</p>
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
          ))}
      </div>
    </div>
  );
};

export default Rekomendasi;
