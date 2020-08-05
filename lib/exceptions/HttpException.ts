class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
      super();
      console.log("const test");
      this.status = status;
      this.message = message;
    }
  }

  export default HttpException;