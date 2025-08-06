import { Request, Response } from "express";
import { UserService } from "../services/user.service";
const userService = new UserService();
export class UserController {
  
  static async invite(req: Request, res: Response) {
    try {
      const { name, email, role } = req.body;
      const adminId = (req as any).user.id;
      const result = await userService.inviteUser(adminId, name, email, role);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  //get all users
  static async getAllUsers(_req: Request, res: Response){
    try{
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    }catch(error){
      console.error("Error fecthing all users", error);
      return res.status(500).json({message: "Internal server error"});
    }
  }
}