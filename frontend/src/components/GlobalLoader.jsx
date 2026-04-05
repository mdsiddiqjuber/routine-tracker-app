import { useEffect, useState } from "react";
import { subscribe } from "../utils/loader";
import { Oval } from "react-loader-spinner";
import "./GlobalLoader.css";

export function GlobalLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe((count) => {
      setLoading(count > 0);
    });

    return unsubscribe;
  }, []);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <Oval
          height={60}
          width={60}
          color="#22c55e"
          strokeWidth={4}
          secondaryColor="#bbf7d0"
          visible={true}
        />
        <p className="loading-text">This may take few moments...</p>
      </div>
    </div>
  );
}