import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
  return (
    <div 
    className="w-full min-h-screen flex items-center justify-center bg-background p-4"
    >
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard"/>
    </div>
  );
}