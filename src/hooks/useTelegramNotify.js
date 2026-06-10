import { useState, useCallback } from 'react';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export function useTelegramNotify() {
  const [sending, setSending] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);

  const notify = useCallback(async (message) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram env vars not configured');
      setLastStatus('unconfigured');
      return { ok: false, error: 'Not configured' };
    }

    setSending(true);
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
      const data = await res.json();
      setLastStatus(data.ok ? 'sent' : 'error');
      setSending(false);
      return data;
    } catch (err) {
      setLastStatus('error');
      setSending(false);
      return { ok: false, error: err.message };
    }
  }, []);

  return { notify, sending, lastStatus };
}
