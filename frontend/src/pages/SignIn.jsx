import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
  return <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />;
}