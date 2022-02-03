import { CurrentAccount } from './CurrentAccount';

export class History {
  dateTransaction!: string;
  typeTransaction!: string;
  balance!: number;
  currentAccount!: CurrentAccount;
  amount!: number;
  constructor(
    dateTransaction: string,
    typeTransaction: string,
    balance: number,
    amount: number,
    currentAccount: CurrentAccount
  ) {
    this.dateTransaction = dateTransaction;
    this.typeTransaction = typeTransaction;
    this.balance = balance;
    this.currentAccount = currentAccount;
    this.amount = amount;
  }
}
