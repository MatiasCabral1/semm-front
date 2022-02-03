export class Parking {
  id!: number;
  date: string;
  started: boolean;
  patent: string;
  user!: {
    id: number;
  };
  constructor(date: string, started: boolean, patent: string) {
    this.date = date;
    this.started = started;
    this.patent = patent;
    this.user = { id: -1 };
  }
}
