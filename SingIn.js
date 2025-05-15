import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organization }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      router.push('/api/redirect'); // simulate redirection based on role
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>SIGN IN</h1>
      <form onSubmit={handleSubmit}>
        <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
          <option>Select your Organization</option>
          <option value="Erindale Health center">Erindale Health center</option>
          <option value="Parkville Manor">Parkville Manor</option>
          <option value="Kenderdine Medical Clinic">Kenderdine Medical Clinic</option>
          <option value="Jim Pattison Children's Hospital">Jim Pattison Children's Hospital</option>
          <option value="Evergreen Medical Clinic">Evergreen Medical Clinic</option>
        </select>
        <br /><br />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
