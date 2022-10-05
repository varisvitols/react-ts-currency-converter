import { useState } from "react";
import Button from "../../components/button/button.component";
import CurrencySelector from "../../components/form/currency-selector/currency-selector.component";
import { defaultExchangeFee } from "../../config/exchange-fee";
import "./admin.styles.scss";
import TextInput from "../../components/form/input-text/input-text.component";
import FormGroup from "../../components/form/form-group/form-group.component";
import {
  useFees,
  feeRecordDefaultValues,
  FeeRecord,
} from "../../contexts/fees.context";

function Admin() {
  const [isEditing, setIsEditing] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [formValues, setFormValues] = useState(feeRecordDefaultValues);
  const [fee, setFee] = useState("");

  const { fees, addNewFeeRecord, updateFeeRecord, deleteFeeRecord } = useFees();

  const handleAddFeeClick = () => {
    setFormValues(feeRecordDefaultValues);
    setFee("");
    setIsEditing(true);
    setIsNewRecord(true);
  };

  const handleEditFeeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    feeRecord: FeeRecord
  ) => {
    setIsEditing(true);
    setIsNewRecord(false);
    setFormValues(feeRecord);
    setFee(feeRecord.fee.toString());
  };

  const handleDeleteFeeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    feeRecord: FeeRecord
  ) => {
    const deletionConfirmed = window.confirm("Really delete?");
    if (deletionConfirmed) deleteFeeRecord(feeRecord);
  };

  const handleSaveFeeClick = () => {
    const valuesToSave = { ...formValues, fee: parseFloat(fee) };

    if (!valuesToSave.id || valuesToSave.id.length < 7 || !valuesToSave.fee) {
      alert("Please enter all required data");
      return;
    }

    setIsEditing(false);

    if (isNewRecord) {
      addNewFeeRecord(valuesToSave);
    } else {
      updateFeeRecord(valuesToSave);
    }
  };

  const handleCurrencySelectorChanges = ({
    from,
    to,
  }: {
    from: string;
    to: string;
  }) => {
    const newValues = { ...formValues, id: `${from}_${to}`, from, to };

    setFormValues(newValues);
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFee(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="page-heading ta-center">Configure Conversion Fees</h1>
      <div className="page-content">
        <div className="sub-heading ta-center">
          Default Exchange Fee: {defaultExchangeFee * 100}%
        </div>
        <div className="exchange-fees">
          {fees.map((item) => {
            return (
              <div key={item.id} className="exchange-fee-record">
                <div className="from-to">
                  {item.from} to {item.to}
                </div>
                <div className="fee-amount">{item.fee.toFixed(4)}</div>
                <div className="edit-fee">
                  <Button
                    text="Edit"
                    disabled={isEditing}
                    onClick={(e) => handleEditFeeClick(e, item)}
                  />
                </div>
                <div className="delete-fee">
                  <Button
                    text="Delete"
                    disabled={isEditing}
                    onClick={(e) => handleDeleteFeeClick(e, item)}
                    className="delete"
                  />
                </div>
              </div>
            );
          })}

          {!isEditing && (
            <Button text="+ Add Fee" onClick={handleAddFeeClick} />
          )}
        </div>

        {isEditing && (
          <>
            <div className="fee-editor">
              <CurrencySelector
                handleCurrencySelectorChanges={handleCurrencySelectorChanges}
                preselectedValues={{
                  from: formValues.from,
                  to: formValues.to,
                }}
                currencyEditDisabled={!isNewRecord}
              />
              <FormGroup
                label="Fee"
                formElement={
                  <TextInput
                    type="text"
                    onChange={handleFeeChange}
                    value={fee}
                  />
                }
              />
            </div>
            <div className="fee-editor-buttons">
              <Button
                text="Cancel"
                onClick={handleCancelClick}
                style={{ width: "37%" }}
              />
              <Button
                text="Save"
                onClick={handleSaveFeeClick}
                style={{ width: "57%" }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
