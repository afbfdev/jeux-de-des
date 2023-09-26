function DiceImages({ value }) {
  //Render (Rendu)
  return (
    <img
      src={`assets/dice-${value}.png`}
      alt={`Dés ${value}`}
      width="100"
      height="100"
    />
  );
}

export default DiceImages;
