import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({ message: "Login successful", ...result });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }
}
