import { useCallback, useEffect, useState } from 'react';

interface Resource<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useResource<T>(load: () => Promise<T>): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    load().then(
      (value) => { if (active) { setData(value); setLoading(false); } },
      () => { if (active) { setError('Не удалось загрузить данные'); setLoading(false); } },
    );
    return () => { active = false; };
  }, [load, revision]);

  const retry = useCallback(() => setRevision((value) => value + 1), []);
  return { data, loading, error, retry };
}
