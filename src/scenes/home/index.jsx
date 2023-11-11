import {useTheme } from "@mui/material";
import React from 'react'
import { tokens } from '../../theme';
import { BsArrowRight } from "react-icons/bs";
const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
        {/* Header */}
        <div className="flex flex-col relative">

        
        <div className=" h-4/5 relative">
           <div className="flex justify-center  items-center h-full ">
            <div className="description w-1/3">
                <p className="font-extrabold text-3xl">Optimalkan Tata Letak Toko dengan Machine Learning SmartStore.</p>
                <p className="my-4 text-xs">Analisa pola pembelian pelanggan dan tingkatkan penjualan toko Anda.</p>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 flex items-center mt-6">
                    Get Started <span className='ml-2'> <BsArrowRight></BsArrowRight></span>
                </button>
                
            </div>
            <div className="image header relative overflow-hidden">
                <img
                    src="/assets/image/heroheader.png"
                    alt="Hero Header"
                    className="object-cover w-full h-full"
                />
            </div>

           
           </div>
        </div>
        
         {/* Faeture 1 */}
        <div className="h-4/5 relative block">
            <div className="title-landing flex justify-center">
                <p className="font-extrabold text-center w-1/2 text-2xl">Buka Kemampuan Analisis Data dan Rekomendasi</p>
            </div>
           
           <div className="flex justify-center items-center relative my-4 gap-4">
                <div class="max-w-sm scale-90 transition duration-300 hover:shadow-2xl  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a className="" href="/">
                        <img className="rounded-t-lg p-4" src="/assets/image/dashboard.jpg" alt="" />
                    </a>
                    <div class="p-5 h-48">
                        <a href="/">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Smart Dashboard</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Menu Dashboard kami menyediakan alat analisis data canggih untuk memahami pola pembelian pelanggan dan mengoptimalkan tata letak toko Anda.</p>
                    </div>
                </div>
                <div class="max-w-sm scale-90 transition duration-300 hover:shadow-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a className="" href="/">
                        <img className="rounded-t-lg p-4" src="/assets/image/aigenerate.png" alt="" />
                    </a>
                    <div class="p-5 h-48 overflow-hidden">
                        <a href="/">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Generate AI</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Melalui menu Generative AI, Anda dapat menerima rekomendasi produk secara waktu nyata dan memprediksi pembelian berikutnya, termasuk produk yang sering dibeli bersamaan.</p>
                    </div>
                </div>
           </div>
        </div>

       
         {/* Faeture 2 */}
         <div className="h-4/5 relative block">
           <div className="flex items-center relative  justify-center">
                <div className="growth w-1/3">
                        <p className="font-extrabold text-xl">Tingkatkan Penjualan dan Efisiensi Toko dengan SmartStore</p>
                        <div className="grid grid-cols-3 gap-4 my-4">
                            <img src="/assets/image/2x/chart-penjualan.png" alt="" />
                            <div className="col-span-2 text-xs">
                                <p className="font-semibold">Meningkatkan Penjualan</p>
                                <p className="py-2">Rekomendasi SmartStore membantu toko meningkatkan penjualan dengan menempatkan produk secara strategis berdasarkan preferensi pelanggan.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 my-4">
                            <img src="/assets/image/2x/efisiensi.png" alt="" />
                            <div className="col-span-2 text-xs">
                                <p className="font-semibold">Meningkatkan Efisiensi</p>
                                <p className="py-2">Dengan SmartStore, toko dapat mengoptimalkan tata letak mereka untuk menyederhanakan operasi dan meningkatkan kepuasan pelanggan.</p>
                            </div>
                        </div>
                </div>
                <div className="image basis-1/2 relative overflow-hidden">
                    <img
                        src="/assets/image/2x/enhancement.jpg"
                        alt="Enhancement Header"
                        className="object-cover h-fit"
                    />
                </div>
           </div>
        </div>
         {/* Booked  */}
         
         {/* Review */}
         {/* Footer */}
         </div>
        </>
    )
}

export default Home