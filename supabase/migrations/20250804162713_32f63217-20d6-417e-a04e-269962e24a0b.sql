-- Fix security warnings in Supabase configuration

-- 1. Fix OTP expiry to recommended threshold (1 hour = 3600 seconds)
-- Update auth configuration to set OTP expiry to 1 hour
UPDATE auth.config 
SET otp_exp = 3600
WHERE otp_exp > 3600;

-- 2. Enable leaked password protection
-- This helps prevent users from using passwords that have been compromised in data breaches
UPDATE auth.config 
SET enable_leaked_password_protection = true
WHERE enable_leaked_password_protection = false;