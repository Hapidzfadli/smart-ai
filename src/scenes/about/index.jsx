"use client";

import { useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { BsArrowRight } from "react-icons/bs";
import { Carousel } from "flowbite-react";
import Card from "../../components/Card";
const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* Header */}
      <div className="flex flex-col relative">
        <div className=" h-4/5 relative">
          <div className="flex-col justify-center  items-center h-full text-center">
            <div className="description ">
              <p className="font-extrabold text-3xl">
                Kelompok 7 - Wilbur Class
              </p>
              <p className="my-4 text-xs">
                Program MSIB Kampus Merdeka Batch 5 Di Orbit Future Academy
              </p>
            </div>
          </div>
        </div>

        {/* Faeture 1 */}
        <div className="h-4/5 relative block my-20">
          <div className="title-landing flex justify-center">
            <p className="font-extrabold text-center w-1/2 text-2xl">
              Anggota Kami
            </p>
          </div>

          <div class="grid grid-cols-3 gap-4 w-2/3 mx-auto my-8">
            <Card
              title="Annisa Amaliyah Rizkiyani"
              image={"/assets/image/annisa.png"}
              role={"UI/UX Designer"}
              universitas={"Sekolah Tinggi Teknologi Bandung"}
            ></Card>
            <Card
              title="Febrina Qoonitah"
              image={"/assets/image/orbit_febby-modified.png"}
              role={"Data Engineer"}
              universitas={"Sekolah Tinggi Teknologi Bandung"}
            ></Card>
            <Card
              title="Hapid Fadli"
              image={"/assets/image/hapidd.png"}
              role={"Web Developer"}
              universitas={"Universitas Pasundan"}
            ></Card>
            <Card
              title="Hanna Sazidah"
              image={"/assets/image/orbit_hanna-modified.png"}
              role={"Project Manager"}
              universitas={"Universitas Diponegoro"}
            ></Card>
            <Card
              title=" Nazma Fauziah"
              image={"/assets/image/nazma.png"}
              role={"Site Administrator"}
              universitas={"Universitas Pendidikan Indonesia"}
            ></Card>

            <Card
              title="Wawan Gunawan"
              image={"/assets/image/orbit_wawan-modified.png"}
              role={"Project Officer"}
              universitas={"Universitas Islam Nusantara"}
            ></Card>
          </div>
        </div>

        {/* Footer */}
      </div>
    </>
  );
};

export default About;
