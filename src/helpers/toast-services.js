import { toast } from "react-toastify";

function success(message = "Success", optionalConfig = {}) {
  toast.success(message, { style: { backgroundColor: '#2BBC91' }, ...optionalConfig });
}

function error(message = "Error!", optionalConfig = {}) {
  toast.error(message, optionalConfig);
}

function warning(message = "Alert!", optionalConfig = {}) {
  toast.warn(message, optionalConfig);
}

function information(message = "Information", optionalConfig = {}) {
  toast.info(message, optionalConfig);
}

const ToastService = {
  success,
  error,
  warning,
  information,
};
export default ToastService;
