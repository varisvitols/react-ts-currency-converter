import { useState } from "react";
import Button from "../../components/button/button.component";
import CurrencySelector from "../../components/form/currency-selector/currency-selector.component";
import { defaultExchangeFee } from "../../config/exchange-fee";
import "./admin.styles.scss";
import TextInput from "../../components/form/input-text/input-text.component";
import FormGroup from "../../components/form/form-group/form-group.component";

function Admin() {
  const [isEditing, setIsEditing] = useState(false);

  const handleAddFeeClick = () => {
    setIsEditing(true);
  };

  const handleEditFeeClick = () => {
    setIsEditing(true);
  };

  const handleSaveFeeClick = () => {
    setIsEditing(false);
  };

  const handleCurrencySelectorChanges = (value: {
    from: string;
    to: string;
  }) => {
    console.log(value);
  };

  return (
    <div>
      <h1 className="section-heading ta-center">Configure Conversion Fees</h1>
      <div className="section-content">
        <div className="sub-heading ta-center">
          Default Exchange Fee: {defaultExchangeFee * 100}%
        </div>
        <div className="exchange-fees">
          <div className="exchange-fee-record">
            <div className="from-to">EUR to GBP</div>
            <div className="fee-amount">0.1</div>
            <div className="edit-fee">
              <Button text="Edit" onClick={handleEditFeeClick} />
            </div>
          </div>

          <div className="exchange-fee-record">
            <div className="from-to">EUR to GBP</div>
            <div className="fee-amount">0.1</div>
            <div className="edit-fee">
              <Button text="Edit" onClick={handleEditFeeClick} />
            </div>
          </div>

          <div className="exchange-fee-record">
            <div className="from-to">EUR to GBP</div>
            <div className="fee-amount">0.1</div>
            <div className="edit-fee">
              <Button text="Edit" onClick={handleEditFeeClick} />
            </div>
          </div>

          {!isEditing && (
            <Button text="+ Add Fee" onClick={handleAddFeeClick} />
          )}

          {isEditing && (
            <>
              <div className="fee-editor">
                <CurrencySelector
                  handleCurrencySelectorChanges={handleCurrencySelectorChanges}
                />
                <FormGroup
                  label="Fee"
                  formElement={
                    <TextInput
                      type="text"
                      value={" "}
                      onChange={() => console.log("input changed")}
                      style={{ maxWidth: "70px" }}
                    />
                  }
                />
              </div>
              <Button text="Save Fee" onClick={handleSaveFeeClick} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
