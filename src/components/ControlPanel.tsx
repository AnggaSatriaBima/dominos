import { useState } from "react";
import dominoData from "@/data/dominoData";
import styles from "@/styles/Home.module.css";

const ControlPanel = ({
  setCards,
  cards,
}: {
  setCards: React.Dispatch<React.SetStateAction<number[][]>>;
  cards: number[][];
}) => {
  const [totalToRemove, setTotalToRemove] = useState<number | null>(null);
  const [newCard, setNewCard] = useState<number[]>([0, 0]); // State for new card input

  const handleRemove = () => {
    if (totalToRemove !== null) {
      setCards((prevCards) =>
        prevCards.filter((card) => card[0] + card[1] !== totalToRemove)
      );
      setTotalToRemove(null);
    }
  };

  const countDoubleNumbers = (cards: number[][]) => {
    return cards.filter((card) => card[0] === card[1]).length;
  };

  // Update double count whenever cards change
  const doubleCount = countDoubleNumbers(cards);

  const sortCards = (order: "asc" | "desc") => {
    setCards((prevCards) =>
      [...prevCards].sort((a, b) => {
        if (a[0] === b[0]) {
          return order === "asc" ? a[1] - b[1] : b[1] - a[1];
        }
        return order === "asc" ? a[0] - b[0] : b[0] - a[0];
      })
    );
  };

  const removeDuplicates = () => {
    setCards((prevCards) => {
      const cardCount: { [key: string]: number } = {};

      // Hitung frekuensi kemunculan setiap kartu
      prevCards.forEach((card) => {
        const key = `${card[0]}-${card[1]}`;
        cardCount[key] = (cardCount[key] || 0) + 1;
      });

      // Hanya ambil kartu yang muncul satu kali
      return prevCards.filter((card) => {
        const key = `${card[0]}-${card[1]}`;
        return cardCount[key] === 1;
      });
    });
  };

  const flipCards = () => {
    setCards((prevCards) => prevCards.map((card) => [card[1], card[0]]));
  };

  const resetData = () => {
    setCards(dominoData);
  };

  const addCard = () => {
    if (newCard[0] >= 0 && newCard[1] >= 0) {
      setCards((prevCards) => [...prevCards, newCard]);
      setNewCard([0, 0]); // Reset new card input
    }
  };

  return (
    <div className={styles.controlPanel}>
      <p>Jumlah Kartu Double: {doubleCount}</p>
      <button className={styles.sortAsc} onClick={() => sortCards("asc")}>
        Sort Ascending
      </button>
      <button className={styles.sortDesc} onClick={() => sortCards("desc")}>
        Sort Descending
      </button>
      <button className={styles.removeDuplicates} onClick={removeDuplicates}>
        Remove Duplicates
      </button>
      <button className={styles.flip} onClick={flipCards}>
        Flip Cards
      </button>
      <button className={styles.reset} onClick={resetData}>
        Reset Data
      </button>

      <div className="mt-4">
        <input
          type="number"
          value={totalToRemove || ""}
          onChange={(e) => setTotalToRemove(Number(e.target.value))}
          placeholder="Total number to remove"
        />
        <button className={styles.remove} onClick={handleRemove}>
          Remove Cards
        </button>
      </div>

      <div className="mt-4">
        <input
          type="number"
          value={newCard[0]}
          onChange={(e) => setNewCard([Number(e.target.value), newCard[1]])}
          placeholder="Card Left"
        />
        <input
          type="number"
          value={newCard[1]}
          onChange={(e) => setNewCard([newCard[0], Number(e.target.value)])}
          placeholder="Card Right"
        />
        <button className={styles.addCard} onClick={addCard}>
          Add Card
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
