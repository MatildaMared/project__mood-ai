import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full flex align-center justify-center">
      <SignUp />
    </div>
  );
}
