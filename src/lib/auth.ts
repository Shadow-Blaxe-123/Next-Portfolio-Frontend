import { cookies } from "next/headers";

export default async function getUser() {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;
  console.log(token);
  return token;
}
