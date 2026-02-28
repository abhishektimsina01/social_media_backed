import { User } from "../interface/interface.ts"; // or your user type

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}