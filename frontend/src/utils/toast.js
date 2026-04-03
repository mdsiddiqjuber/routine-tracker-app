import { toast } from "react-toastify";

export const handleSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    style: {
      padding: "16px",
      borderRadius: "10px",
      fontSize: "15px",
    },
  });
};

export const handleError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    style: {
      padding: "16px",
      borderRadius: "10px",
      fontSize: "15px",
    },
  });
};