export class CurrentAccount {
  id!: number;
  phone!: string;
  balance!: number;
  constructor(balance: number, phone: string) {
    this.balance = balance;
    this.phone = phone;
  }
}
