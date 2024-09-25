// app/page.tsx
"use client";

import React, { useState } from "react";
import ControlPanel from "@/components/ControlPanel";
import styles from "@/styles/Home.module.css";
import dominoData from "@/data/dominoData";
import CardList from "@/components/CardList";

export default function Home() {
  const [cards, setCards] = useState<number[][]>(dominoData); // Initialize with default data

  return (
    <div className={styles.container}>
      <h1 className="mb-4 text-2xl justify-center items-center text-gray-900 sm:text-4xl">
        Domino Game
      </h1>
      <CardList cards={cards} />
      <div className="mt-4">
        <ControlPanel setCards={setCards} cards={cards} />
      </div>
    </div>
  );
}
