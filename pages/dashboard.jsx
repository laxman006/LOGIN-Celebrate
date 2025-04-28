import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isFirstTime = localStorage.getItem('firstTime');

    if (isFirstTime === 'true') {
  
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });

      
      setTimeout(() => {
        document.getElementById('cake').style.display = 'block';
      }, 0);

      
      localStorage.setItem('firstTime', 'false');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <h1>🎉 Happy Birthday! 🎉</h1>
      <img
        id="cake"
        src="/cake.png"
        alt="Cake"
        style={{ width: '300px', display: 'none', marginTop: '20px' }}
      />
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
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
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
