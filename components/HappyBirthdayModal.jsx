import { useEffect } from 'react';

const HappyBirthdayModal = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h1>🎂 Happy Birthday! 🎉</h1>
        <img
          src="/cake.png"
          alt="Birthday Cake"
          style={{ width: '200px', marginTop: '20px' }}
        />
        <button style={styles.button} onClick={onClose}>Thank You!</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: 'white', padding: '40px', borderRadius: '8px',
    textAlign: 'center'
  },
  button: {
    marginTop: '20px', padding: '10px 20px', fontSize: '16px', borderRadius: '5px'
  }
};

export default HappyBirthdayModal;
