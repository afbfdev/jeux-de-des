import { useEffect, useState } from "react";
import DiceImages from "./DiceImages";

function Dice() {
  // Les État (State)
  const [dice1Value, setDice1Value] = useState(1);
  const [dice2Value, setDice2Value] = useState(1);
  const [scores, setScores] = useState({ joueur1: 0, joueur2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("joueur1");
  //const [startingPlayer, setStartingPlayer] = useState("joueur1");
  const [rolling, setRolling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Gérons les comportement

  const rollDice = () => {
    if (gameOver) {
      return;
    }

    setRolling(true);
    setWinner(null);
    // Générons de Nouvelles valeur aléatoire pour les dés

    const newValue1 = Math.floor(Math.random() * 6) + 1;
    const newValue2 = Math.floor(Math.random() * 6) + 1;

    // Calculon le score en fonction des valeurs des dés
    const newScore = newValue1 + newValue2;
    switchPlayer(); //Passons au joueur suivant
    //Mettons à jour l'état des dés
    setDice1Value(newValue1);
    setDice2Value(newValue2);
    setScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + newScore,
    }));
    setTimeout(() => {
      setRolling(false);
    }, 1000);

    if (scores.joueur1 >= 50 || scores.joueur2 >= 50) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setDice1Value(1);
    setDice2Value(1);
    setScores({ joueur1: 0, joueur2: 0 });
    setWinner(null);
    setGameOver(false);
    // Choisissons un joueur de départ aléatoire
    const randomStartingPlayer = Math.random() < 0.5 ? "joueur1" : "joueur2";
    setCurrentPlayer(randomStartingPlayer);
    //setStartingPlayer(randomStartingPlayer);
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    const victoryScore = 50;
    if (scores.joueur1 >= victoryScore) {
      setWinner("joueur1");
    } else if (scores.joueur2 >= victoryScore) {
      setWinner("joueur2");
    }
  }, [scores]);

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "joueur1" ? "joueur2" : "joueur1");
  };
  //Render
  return (
    <div className="dice-game">
      <h2>Joueur actuel : {currentPlayer}</h2>
      <div className="dice-container">
        <div className={`dice ${rolling ? "rolling" : ""}`}>
          <DiceImages value={dice1Value} />
        </div>
        <div className={`dice ${rolling ? "rolling" : ""}`}>
          <DiceImages value={dice2Value} />
        </div>
      </div>
      <h2>Score Joueur 1 : {scores.joueur1}</h2>
      <h2>Score Joueur 2 : {scores.joueur2}</h2>

      {winner && (
        <p style={{ color: "#00ff64" }}>
          Bravo 🎁{winner} à gagné avec un score score de{" "}
          {winner === "joueur1" ? scores.joueur1 : scores.joueur2}
        </p>
      )}

      <div className="btn">
        <button onClick={rollDice} disabled={rolling || gameOver}>
          {rolling ? "En Progression...♻" : "🎲Lancer les dés"}
        </button>
        <button onClick={resetGame}>🔄Réinitialiser le jeu</button>
      </div>
    </div>
  );
}

export default Dice;
