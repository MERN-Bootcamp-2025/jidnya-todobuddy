import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/mailer";
export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  async inviteUser(adminId: string, name: string, email: string, role: "admin" | "user") {
    const existing = await this.userRepo.findOneBy({ email });
    if (existing) throw new Error("User already exists");
    const tempPassword = uuidv4().split("-")[0];
    const password_hash = await bcrypt.hash(tempPassword, 10);
    const newUser = this.userRepo.create({
      name,
      email,
      role,
      password_hash,
      invited_by: adminId,
    });
    await this.userRepo.save(newUser);
    await sendEmail(email, name, tempPassword);
    return { message: "User invited successfully" };
  }
}