export class Patent {
  id!: number;
  number: string;
  user!: {
    username: string;
  };
  constructor(number: string, username: string) {
    this.number = number;
    this.user = { username: username };
  }
}
