"use client"

import Image from "next/image";
import Header from "../components/header";
import Link from 'next/link';
import Footer from "../components/footer";
import { ImBooks } from "react-icons/im";
import { useState, useEffect } from "react";
import { getGames } from "../api/inventoryAPI"; 

export default function Library() {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await getGames(localStorage.getItem("user")!);
      setInventory(response.jogos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="bg-gray-700 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Header bgColor="black"/>
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
       <p className="text-5xl text-white"> <ImBooks /> Sua Biblioteca </p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {inventory.map((game) => (
          <div key={game} className="bg-white rounded-lg shadow-md overflow-hidden relative">

            <img src="mario.avif"
            alt={game} className="w-full h-64 object-cover" /> :
            <div className="w-full h-30 object-cover"></div>

            <div className="p-4 flex items-center gap-3 justify-between">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-black text-xl font-bold text-left">{game}</h2>
                </div>

                <Link href="https://www.clickjogos.com.br/" legacyBehavior>
                    <button className="font-semibold rounded-lg text-white border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-green-500 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 bg-green-600">Jogar</button>
                </Link>
            </div>
        </div>))}
        </div>
      </main>
      <Footer/>
    </div>
  );
}