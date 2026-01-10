import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast container state
let toastState = {
  toasts: [],
  listeners: [],
};

// Subscribe to toast state
const subscribe = (listener) => {
  toastState.listeners.push(listener);
  return () => {
    toastState.listeners = toastState.listeners.filter((l) => l !== listener);
  };
};

// Notify all listeners
const notify = () => {
  toastState.listeners.forEach((listener) => listener(toastState.toasts));
};

// Add toast
export const showToast = (message, type = 'info', duration = 3000) => {
  const id = Date.now();
  const toast = { id, message, type, duration };
  toastState.toasts = [...toastState.toasts, toast];
  notify();

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};

// Remove toast
const removeToast = (id) => {
  toastState.toasts = toastState.toasts.filter((t) => t.id !== id);
  notify();
};

// Toast icons
const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

// Toast colors
const colors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribe(setToasts);
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg border shadow-lg animate-slide-in ${colors[toast.type]}`}
          >
            <Icon className={`w-5 h-5 mr-3 ${iconColors[toast.type]}`} />
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 p-1 rounded hover:bg-black/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;

