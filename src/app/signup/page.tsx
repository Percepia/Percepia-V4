import { redirect } from "next/navigation";

export default function SignupRedirect() {
  // Redirect all /signup traffic to the login page
  redirect("/login");
}
