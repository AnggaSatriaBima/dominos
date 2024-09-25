// components/Card.tsx
import styles from "@/styles/Home.module.css";

const Card = ({ card }: { card: number[] }) => {
  return (
    <div className={styles.card}>
      {card[0]} | {card[1]}
    </div>
  );
};

export default Card;
