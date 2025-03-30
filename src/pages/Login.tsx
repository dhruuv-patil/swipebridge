
import { Navbar } from "@/components/navbar";
import { AuthForm } from "@/components/auth/auth-form";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm />
      </main>
    </div>
  );
};

export default Login;
