import { createContext, useState } from "react";
import { Audio } from "react-loader-spinner";

interface LoadingContextProps {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextProps | null>(null);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Audio
            height="40"
            width="40"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        children
      )}
    </LoadingContext.Provider>
  );
};
