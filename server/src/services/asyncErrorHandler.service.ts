import { NextFunction, Request, Response } from "express";

const asyncErrorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: Error) => {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        fullError: error,
      });
    });
  };
};

export default asyncErrorHandler;

/*@Objective
* The asyncErrorHandler is a high order for handling multiple async_try&catch
  as a wrapper

*/
// Some Theories
/*@Higher_Order_Function
* Higher order function which accepts other function as a parameter
 
*@Callback_Function
* A Function which goes as parameter for other functions
* eg: filter, map, reduce, forEach
* Arrays.forEach(()=>{})

*/
