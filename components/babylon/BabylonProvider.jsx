import { createContext, useContext, useState, useCallback } from 'react';

const BabylonContext = createContext(null);

export function BabylonProvider({ children }) {
  const [scene, setScene] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleReady = useCallback(({ scene, canvas, engine }) => {
    setScene(scene);
    setCanvas(canvas);
    setEngine(engine);
    setLoading(false);
  }, []);

  return (
    <BabylonContext.Provider value={{ scene, canvas, engine, loading, onReady: handleReady }}>
      {children}
    </BabylonContext.Provider>
  );
}

export function useBabylon() {
  const ctx = useContext(BabylonContext);
  if (!ctx) throw new Error('useBabylon must be used inside <BabylonProvider>');
  return ctx;
}