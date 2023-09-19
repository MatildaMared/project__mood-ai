import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full flex align-center justify-center">
      <SignIn />
    </div>
  );
}
