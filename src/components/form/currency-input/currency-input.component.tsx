import "./currency-input.styles.scss";

function CurrencyInput() {
  return (
    <select className="currency-input">
      <option value="cat">Cat</option>
      <option value="dog">Dog</option>
      <option value="rabbit">Rabbit</option>
      <option value="bear">Bear</option>
    </select>
  );
}

export default CurrencyInput;
