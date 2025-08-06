export interface InviteDto {
  name: string;
  email: string;
  role: "admin" | "user";
}