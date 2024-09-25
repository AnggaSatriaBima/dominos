// app/components/CardList.tsx
import React from "react";
import styles from "@/styles/Home.module.css";

const CardList = ({ cards }: { cards: number[][] }) => {
  return (
    <div className={styles.cardList}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <span className={styles.cardValue}>
            [{card[0]}, {card[1]}]
          </span>
          {/* Hapus tombol remove di sini */}
        </div>
      ))}
    </div>
  );
};

export default CardList;
