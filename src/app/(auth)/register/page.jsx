'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import { registerUser } from '@/apis/auth';
import { registerUser } from '@/apis/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const roles = ['Admin', 'User' ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !fullName || !password || !selectedRole) {
      setError('All fields are required including role');
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({
        email,
        password,
        full_name: fullName,
        role: selectedRole,
      });
      

      alert('Registration successful');
      router.push('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please check your input.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7ff]">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <img src="/logo.png" alt="Logo" className="h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Role</label>
            <div className="flex flex-col gap-2">
              {roles.map((role) => (
                <label key={role} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={() => setSelectedRole(role)}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <a href="/" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
