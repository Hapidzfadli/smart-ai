import React from "react";

import CardGenerate from "../../components/CardGenerate";
const GenerateAi = () => {
  return (
    <div>
      <div className="h-4/5 relative block my-8">
        <div className="title-landing flex justify-center">
          <p className="font-extrabold text-center w-1/2 text-2xl">
            Generate AI
          </p>
        </div>
        <div class="grid grid-cols-2 gap-1 w-2/3 mx-auto my-8">
          <CardGenerate
            title={"Prediksi"}
            description={
              "Fitur yang dapat memprediksi pembelian selanjutnya berdasarkan riwayat pembelian pelanggan."
            }
            img={"/assets/image/prediksi.jpg"}
            url={"/prediksi"}
          />
          <CardGenerate
            title={"Rekomedasi"}
            description={
              "Fitur yang dapat merekomendasikan produk yang biasa dibeli secara bersamaan oleh pelanggan."
            }
            img={"/assets/image/rekomendasi.jpg"}
            url={"/rekomendasi"}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateAi;
