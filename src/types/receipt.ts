export default interface Receipt {
  IsReceipt: boolean;
  Items: {
    Name: string;
    Price: number;
    Quantity: number;
    Category: string;
  }[];
  TransactionID: string;
  TransactionDate: string;
}
