import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
  return (
    <div 
    className="w-full min-h-screen flex items-center justify-center bg-background p-4"
    >
      <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
    </div>
  )
}