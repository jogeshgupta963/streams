import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface UserPayload {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  const decoded = req.cookies.JWT;
  try {
    if (!decoded) {
      throw new Error("NOT AUTHORISED");
    }
    const payload = jwt.verify(decoded, "zxcvbnm") as UserPayload;
    req.user = payload;
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        data: err.message,
      });
    }
  }
}
