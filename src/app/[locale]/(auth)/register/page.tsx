import { RegisterForm } from "../../(components)/auth/RegisterForm";
export default function register() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
      <RegisterForm />
    </div>
  );
}
