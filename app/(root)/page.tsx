'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [organization, setOrganization] = useState('');
  const [orgList, setOrgList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('/api/signIn')
      .then((res) => res.json())
      .then((data) => setOrgList(data))
      .catch((err) => console.error('Failed to fetch organizations:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!organization) {
      setErrorMessage('Please select an organization.');
      return;
    }

    const res = await fetch('/api/signIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organization }),
    });

    const data = await res.json();
    if (!res.ok) {
      setErrorMessage(data.error || 'Something went wrong');
    } else {
      setSuccessMessage(data.message);
      router.push('/SignIn_registration'); // next path to go
    }
  };



  return (
    <>
      <style jsx global>{`
        select, option {
          color: #000 !important;
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>SIGN IN</h1>
          <form onSubmit={handleSubmit}>
            <select
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              style={styles.select}
            >
              <option value="">Select your Organization</option>
              {orgList.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>

            <button type="submit" style={styles.button}>Submit</button>

            <p style={styles.link}>
              <a
                href="https://docs.google.com/forms/d/1sT9sf46xu9hIWWKs3rVgfRdPpNRJ1z6YkhYO0Si4u3E/edit?pli=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                create account
              </a>
            </p>

            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'pink',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#000',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#ffffff',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
  link: {
    marginTop: '10px',
    color: '#000',
  },
};










