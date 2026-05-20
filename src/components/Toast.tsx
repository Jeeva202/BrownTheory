import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Check } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastHandle {
  show: (msg: string) => void;
}

const Toast = forwardRef<ToastHandle>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => ({
    show(msg: string) {
      setMessage(msg);
      setVisible(true);
    },
  }));

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      <Check size={15} strokeWidth={2} color="var(--gold)" />
      <span>{message}</span>
    </div>
  );
});
Toast.displayName = 'Toast';
export default Toast;
export type { ToastHandle };
