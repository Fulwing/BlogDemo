'use client';

import { useRouter } from 'next/navigation';

export default function SignUpButton() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <button
      onClick={handleSignUp}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200"
    >
      Sign Up
    </button>
  );
}
