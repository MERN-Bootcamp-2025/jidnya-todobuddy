import { AppDataSource } from "../config/database";
import { User, UserRole } from "../models/User";
import bcrypt from "bcrypt";

export const admin = async () => {
  const userRepo = AppDataSource.getRepository(User);

  const existingAdmin = await userRepo.findOneBy({ email: "admin@todobody.com" });

  const password_hash = await bcrypt.hash("admin@123", 10);

  if (existingAdmin) {
    if (existingAdmin.role !== UserRole.ADMIN) {
      existingAdmin.role = UserRole.ADMIN;
      await userRepo.save(existingAdmin);
      console.log("Existing user to admin.");
    } else {
      console.log("Admin already exists.");
    }
    return;
  }

  const admin = userRepo.create({
    name: "Default Admin",
    email: "admin@todobody.com",
    password_hash,
    role: UserRole.ADMIN,
  });

  await userRepo.save(admin);
  console.log("Default admin added.");
};
