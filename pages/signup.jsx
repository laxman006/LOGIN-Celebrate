import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Save user in localStorage (Simple for demo)
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('firstTime', 'true');

    alert('Signup successful!');
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
  );
}


const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        fontSize: '18px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};