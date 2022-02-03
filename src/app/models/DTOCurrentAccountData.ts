import { CurrentAccount } from './CurrentAccount';

export class CurrentAccountDataDTO {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  currentAccount!: CurrentAccount;
  constructor(
    name: string,
    username: string,
    email: string,
    currentAccount: CurrentAccount
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.currentAccount = currentAccount;
  }
}
