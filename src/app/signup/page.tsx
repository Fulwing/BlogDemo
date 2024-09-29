'use client';

import { signUpSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { saltAndHashPassword } from "@/db/utils/password";
import { insertUser } from '@/db/queries/insert';
import { InsertUser } from "@/db/schema";
import { useRouter } from 'next/navigation';
import { config } from 'dotenv';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
config({ path: '.env.local' });

// Define the form data type according to the signUpSchema
type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const cryptedPassword = await saltAndHashPassword(data.password);

      const user: InsertUser = {
        username: data.username,
        password: cryptedPassword,
      };

      await insertUser(user);

      toast.success('Signup successful! Please login.');

      router.push('/');
    } catch (error) {
      toast.error(`An error occurred during signup. ${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          {...register("username")}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
