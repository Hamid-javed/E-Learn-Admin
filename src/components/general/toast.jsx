import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const severityStyles = {
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-black",
  danger: "bg-red-500 text-white",
};

const severityIcons = {
  success: <FaCheckCircle className="text-2xl" />,
  warning: <FaExclamationTriangle className="text-2xl" />,
  danger: <FaTimesCircle className="text-2xl" />,
};

const Toast = ({ message, severity = "success", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2300);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed w-72 bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center toast space-x-2 transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${severityStyles[severity]}`}
    >
      {severityIcons[severity]}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
