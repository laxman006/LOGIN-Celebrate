import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1>Welcome to PPY Technologies</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => router.push('/login')}>Login</button>
        <button style={styles.button} onClick={() => router.push('/signup')}>Signup</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh', display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center', textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px', display: 'flex', gap: '20px',
  },
  button: {
    padding: '10px 20px', fontSize: '18px', borderRadius: '5px',
    cursor: 'pointer', backgroundColor: '#0070f3',
    color: 'white', border: 'none', transition: 'background-color 0.3s',    
  },
};
