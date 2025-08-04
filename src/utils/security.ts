// Security utilities for input validation and sanitization

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Validates URL format
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates file type for uploads
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Checks for suspicious file patterns
 */
export const isSuspiciousFile = (filename: string): boolean => {
  const suspiciousPatterns = /\.(php|js|exe|bat|cmd|scr|pif|com|vbs|jar)$/i;
  return suspiciousPatterns.test(filename);
};

/**
 * Rate limiting helper for preventing spam
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  
  constructor(private maxAttempts: number = 5, private windowMs: number = 60000) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    if (record.count >= this.maxAttempts) {
      return false;
    }
    
    record.count++;
    record.lastAttempt = now;
    return true;
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

/**
 * Secure logging that doesn't expose sensitive information
 */
export const secureLog = (message: string, data?: any): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  } else {
    // In production, only log non-sensitive information
    console.log(message);
  }
};

/**
 * CSRF token generation (simple implementation)
 */
export const generateCSRFToken = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};