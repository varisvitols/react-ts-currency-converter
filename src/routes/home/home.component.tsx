import { useState } from "react";
import InputText from "../../components/form/input-text/input-text.component";

import "../../components/form/form.styles.scss";
import Button from "../../components/button/button.component";
import FormGroup from "../../components/form/form-group/form-group.component";

function Home() {
  const [amount, setAmount] = useState("");

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setAmount(e.target.value);
  };

  const formSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log("form submit");
  };

  return (
    <div>
      <h1 className="section-heading ta-center">Simple Currency Converter</h1>
      <div className="section-content">
        <div className="sub-heading ta-center">Exchange Rate</div>
        <div className="rate ta-center">$34.43</div>

        <form onSubmit={formSubmitHandler}>
          <FormGroup
            label="Amount"
            formElement={
              <InputText
                type="number"
                value={amount}
                onChange={inputChangeHandler}
              />
            }
          />
          {/* <div className="form-group">
            <label>Amount</label>
            <InputText
              type="number"
              value={amount}
              onChange={inputChangeHandler}
              ref={inputRef}
            />
          </div> */}

          {/* <div className="form-group">
            <label>Label</label>
            <InputText
              type="number"
              value={amount}
              onChange={inputChangeHandler}
              ref={inputRef}
            />
          </div> */}

          <div className="form-group">
            <Button type="submit" text="Convert" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
