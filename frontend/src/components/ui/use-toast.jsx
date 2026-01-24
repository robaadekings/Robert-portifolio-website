import { toast as sonnerToast } from "sonner"

/**
 * Custom toast hook that wraps sonner's toast
 * Provides a consistent API for showing toast notifications
 */
export function useToast() {
  const toast = ({ title, description, variant = "default", ...props }) => {
    if (variant === "destructive") {
      return sonnerToast.error(title, {
        description,
        ...props,
      })
    }

    return sonnerToast.success(title, {
      description,
      ...props,
    })
  }

  return {
    toast,
    success: (title, options) => sonnerToast.success(title, options),
    error: (title, options) => sonnerToast.error(title, options),
    info: (title, options) => sonnerToast.info(title, options),
    warning: (title, options) => sonnerToast.warning(title, options),
  }
}
