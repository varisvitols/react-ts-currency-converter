import { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage.hook";

export type FeeRecord = {
  id: string; // from_to
  from: string;
  to: string;
  fee: number;
};

export const feeRecordDefaultValues: FeeRecord = {
  id: "",
  from: "",
  to: "",
  fee: 0,
};

type ProviderProps = {
  children: ReactNode;
};

const _addNewFeeRecord = (
  feeRecordList: FeeRecord[],
  recordToAdd: FeeRecord
) => {
  const existingRecord = feeRecordList.find(
    (record) => record.id === recordToAdd.id
  );
  if (existingRecord) {
    alert("Such record already exists! No changes were made.");
    return feeRecordList;
  }

  const newFeeRecord = { ...recordToAdd };
  return [...feeRecordList, newFeeRecord];
};

const _updateFeeRecord = (
  feeRecordList: FeeRecord[],
  updatedRecord: FeeRecord
) => {
  const existingRecord = feeRecordList.find(
    (record) => record.id === updatedRecord.id
  );

  if (existingRecord) {
    return feeRecordList.map((item) =>
      item.id === updatedRecord.id ? { ...item, ...updatedRecord } : item
    );
  }

  return feeRecordList;
};

const _deleteFeeRecord = (
  feeRecordList: FeeRecord[],
  recordToRemove: FeeRecord
) => {
  const existingRecord = feeRecordList.find(
    (record) => record.id === recordToRemove.id
  );

  if (existingRecord) {
    return feeRecordList.filter((item) => item.id !== recordToRemove.id);
  }

  return feeRecordList;
};

const FeesContext = createContext({} as FeesContextBlueprint);

export function useFees() {
  return useContext(FeesContext);
}

export type FeesContextBlueprint = {
  fees: FeeRecord[];
  addNewFeeRecord: (feeRecordToAdd: FeeRecord) => void;
  updateFeeRecord: (updatedRecord: FeeRecord) => void;
  deleteFeeRecord: (recordToDelete: FeeRecord) => void;
};

export function FeesProvider({ children }: ProviderProps) {
  const [fees, setFees] = useLocalStorage<FeeRecord[]>("exchange_fees", []);

  const addNewFeeRecord = (feeRecordToAdd: FeeRecord) => {
    setFees(_addNewFeeRecord(fees, feeRecordToAdd));
  };

  const updateFeeRecord = (updatedRecord: FeeRecord) => {
    setFees(_updateFeeRecord(fees, updatedRecord));
  };

  const deleteFeeRecord = (recordToDelete: FeeRecord) => {
    setFees(_deleteFeeRecord(fees, recordToDelete));
  };

  const value = { fees, addNewFeeRecord, updateFeeRecord, deleteFeeRecord };
  return <FeesContext.Provider value={value}>{children}</FeesContext.Provider>;
}
