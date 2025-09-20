// Authentication utilities
export interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionExpiry: number;
}

const SESSION_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  console.log('Phone validation - Original:', phone, 'Digits only:', digitsOnly);
  
  // Brazilian mobile: 11 digits (55 + DD + 9XXXXXXXX) or 10 digits (DD + 9XXXXXXXX)
  const isValid = (
    (digitsOnly.length === 11 && digitsOnly.startsWith('55') && digitsOnly[4] === '9') ||  // +55DD9XXXXXXXX
    (digitsOnly.length === 11 && digitsOnly[2] === '9') ||  // DD9XXXXXXXX
    (digitsOnly.length === 10 && digitsOnly[2] === '9')     // DD9XXXXXXX (older format)
  );
  
  console.log('Phone validation result:', isValid);
  return isValid;
};

export const validateOTP = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

export const sendOTP = async (phone: string): Promise<{ success: boolean; message: string }> => {
  // Simulate OTP sending - in real app this would call Firebase Auth
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, always succeed
      resolve({ success: true, message: "Código enviado via SMS" });
    }, 1500);
  });
};

export const verifyOTP = async (phone: string, otp: string): Promise<{ success: boolean; user?: User }> => {
  // Simulate OTP verification - accept 123456 for demo
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp === "123456") {
        const user: User = {
          id: `user_${Date.now()}`,
          name: extractNameFromPhone(phone),
          phone,
          createdAt: new Date().toISOString(),
        };
        resolve({ success: true, user });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};

export const saveAuthState = (user: User): void => {
  const authState: AuthState = {
    user,
    isAuthenticated: true,
    sessionExpiry: Date.now() + SESSION_DURATION,
  };
  localStorage.setItem('authState', JSON.stringify(authState));
};

export const getAuthState = (): AuthState | null => {
  try {
    const stored = localStorage.getItem('authState');
    if (!stored) return null;
    
    const authState: AuthState = JSON.parse(stored);
    
    // Check if session is expired
    if (Date.now() > authState.sessionExpiry) {
      clearAuthState();
      return null;
    }
    
    return authState;
  } catch {
    return null;
  }
};

export const clearAuthState = (): void => {
  localStorage.removeItem('authState');
  localStorage.removeItem('userProperties');
  // Clear any other user data
};

const extractNameFromPhone = (phone: string): string => {
  // Generate a placeholder name - in real app this would come from user input or be optional
  return "Produtor Rural";
};