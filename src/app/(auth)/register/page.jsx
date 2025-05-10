'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/apis/userApi';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !fullName || !password || !address || !bio || !displayName) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({
        email,
        password,
        full_name: fullName,
        address,
        bio,
        display_name: displayName,
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
          <InputField label="Email" value={email} onChange={setEmail} type="email" />
          <InputField label="Display Name" value={displayName} onChange={setDisplayName} />

          <InputField label="Full Name" value={fullName} onChange={setFullName} />
          <InputField label="Password" value={password} onChange={setPassword} type="password" />
          
          {/* Address Textarea */}
          <TextareaField label="Address" value={address} onChange={setAddress} />

          {/* Bio Textarea */}
          <TextareaField label="Bio" value={bio} onChange={setBio} />


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

function InputField({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold">{label}</label>
      <input
        type={type}
        placeholder={label}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold">{label}</label>
      <textarea
        placeholder={label}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        rows="4" // Default height
      />
    </div>
  );
}
