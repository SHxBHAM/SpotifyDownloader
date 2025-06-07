'use client';
import { useState } from 'react';

export default function Home() {
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing...');

    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter Spotify track link"
          className="border px-3 py-2 w-[400px]"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Download MP3
        </button>
      </form>
      <p className="mt-4">{status}</p>
    </main>
  );
}
