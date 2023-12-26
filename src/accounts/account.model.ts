export class Account {
  constructor(
    public accountNumber: string,
    public balance: number,
    public transactions: Array<any> = [],
  ) {}
}
