import { CurrentAccount } from './CurrentAccount';

export class History {
  dateTransaction!: string;
  typeTransaction!: string;
  currentAccount!: CurrentAccount;
  amount!: number;
  balance: number;
  constructor(
    dateTransaction: string,
    typeTransaction: string,
    balance: number,
    amount: number,
    currentAccount: CurrentAccount
  ) {
    this.dateTransaction = dateTransaction;
    this.typeTransaction = typeTransaction;
    this.currentAccount = currentAccount;
    this.amount = amount;
    this.balance = balance;
  }
}
