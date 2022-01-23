import * as uuid from 'uuid';

export class GenericException {
  private errorId: string;
  private date: number;
  private error: string;
  private message: string;
  private data: any;
  private status: number;

  constructor(error: string, message: string, data?: any) {
    this.errorId = uuid.v4();
    this.date = Date.now();
    this.error = error;
    this.message = message;
    if (data) {
      this.data = data;
    }
    this.status = 500;
  }

  public getStatus() {
    return this.status;
  }

  public setStatus(val: number) {
    this.status = val;
  }

  public getErrorId() {
    return this.errorId;
  }
}