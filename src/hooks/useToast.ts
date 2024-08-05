import toast from "react-hot-toast";
export function useToast(success: boolean, message: string) {
  if (success)
    toast.success(message, {
      duration: 3000,
      position: "top-right",
      className: "toast",
      style: { background: "#fff", color: "#000" },
    });
  else
    toast.error(message, {
      duration: 3000,
      position: "top-right",
      className: "toast",
      style: { background: "#fff", color: "#000" },
    });
}
