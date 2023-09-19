import { BaseException } from './base.exception';

export class EthersException extends BaseException {
  public static code = 1100;
  constructor(code_: number, message_: string, data_?: any) {
    super(code_, message_, data_);
  }
  public static ExceedTime = (input: number, target: number) => {
    throw new EthersException(
      this.code + 1,
      `Timestamp in message exceed currentTimestamp ${input} vs ${target}`,
    );
  };
  public static ExceedTimeInterval = (interval: number) => {
    throw new EthersException(
      this.code + 2,
      `Exceeded time interval allow - interval :${interval}s`,
    );
  };

  public static AddressMismatch = (input: string, verifyAddress: string) => {
    throw new EthersException(
      this.code + 3,
      `
    Difference between auth address and signature address :
    ${input} vs ${verifyAddress}
    `,
    );
  };
}
