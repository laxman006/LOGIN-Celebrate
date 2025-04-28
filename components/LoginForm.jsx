import { useState } from 'react';
import { useRouter } from 'next/router';
import { Preferences } from '@capacitor/preferences';
import HappyBirthdayModal from './HappyBirthdayModal';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showBirthday, setShowBirthday] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    // In real app, verify username/password
    if (username && password) {
      // Check if first time login
      let seen = localStorage.getItem('seenHappyBirthday');
      try {
        const { value } = await Preferences.get({ key: 'seenHappyBirthday' });
        if (value) seen = value;
      } catch (e) {
        console.log('Native Preferences not ready.');
      }

      if (!seen) {
        setShowBirthday(true);
        localStorage.setItem('seenHappyBirthday', 'true');
        try {
          await Preferences.set({ key: 'seenHappyBirthday', value: 'true' });
        } catch (e) {
          console.log('Failed to save in Preferences.');
        }
      } else {
        router.push('/dashboard'); // move to dashboard or home page
      }
    }
  };

  const handleCloseBirthday = () => {
    setShowBirthday(false);
    router.push('/dashboard');
  };

  return (
    <>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>
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
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {showBirthday && <HappyBirthdayModal onClose={handleCloseBirthday} />}
    </>
  );
};

const styles = {
  form: {
    display: 'flex', flexDirection: 'column', gap: '10px',
    width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px'
  },
  input: {
    padding: '10px', fontSize: '16px',
  },
  button: {
    padding: '10px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer',
  }
};

export default LoginForm;
