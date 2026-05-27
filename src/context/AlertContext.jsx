import { createContext, useContext, useState, useCallback } from "react";

// Create the context
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: "", onConfirm: null });

  // useCallback prevents this function from being recreated on every render
  const showAlert = useCallback((message, onConfirm = null) => {
    setAlert({ show: true, message, onConfirm });
  }, []);

  const closeAlert = () => {
    if (alert.onConfirm) {
      alert.onConfirm(); // Run the redirect if one was passed
    }
    setAlert({ show: false, message: "", onConfirm: null }); // Hide modal
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      
      {/* The Global Modal UI */}
      {alert.show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{alert.message}</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={closeAlert}>
              OK
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};