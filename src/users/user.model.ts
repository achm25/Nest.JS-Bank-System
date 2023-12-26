export class User {
  constructor(
    public id: string,
    public password: string,
    public firstName: string,
    public secondName: string,
    public registerData: string,
    public accounts: Array<any> = [],
  ) {}
}
