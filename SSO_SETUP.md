# Supabase SSO Setup Guide

## Overview
This guide walks you through integrating Google OAuth (SSO) with your Supabase authentication system.

## Step 1: Configure Google OAuth in Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Authentication** → **Providers**
3. Click **Google** and enable it
4. You'll need Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project (or use existing)
   - Enable the Google+ API
   - Go to **Credentials** → **Create OAuth 2.0 Client ID** → **Web application**
   - Add Authorized Redirect URIs:
     ```
     https://avxlrvtuhcigthsluftv.supabase.co/auth/v1/callback
     http://localhost:5173
     http://localhost:5173/auth/callback
     http://localhost:5173/
     ```
   - Copy the **Client ID** and **Client Secret**
5. Paste these into your Supabase Google provider settings
6. Save

## Step 2: Set Up Database Schema

Run these SQL queries in your Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'student');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Step 3: Environment Variables

Ensure your `.env.local` file has:

```
VITE_SUPABASE_URL=https://avxlrvtuhcigthsluftv.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable__hN2mR8-NGK9l2z69KYmMQ_YS8YY3po
```

**Note:** The variable names use `VITE_` prefix (not `NEXT_PUBLIC_`) because this is a Vite project.

## Step 4: How the SSO Flow Works

1. **User clicks "Continue with UB Mail"** on SignInPage.jsx
2. **SignInPage passes the selected role** in the OAuth state parameter
3. **Google OAuth flow** redirects user back to your app
4. **AuthContext** catches the OAuth callback and:
   - Validates the email domain (@ub.edu.ph)
   - Fetches or creates the user's profile
   - Sets the role (from URL state or database)
   - Updates AuthContext with user and role
5. **App.jsx** renders the appropriate dashboard (StudentDashboard or AdminDashboard)

## Step 5: Testing

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Click "Sign In" on the login page

3. Select "Student" or "Faculty"

4. Click "Continue with UB Mail"

5. You'll be redirected to Google

6. After signing in, you'll be redirected back to the app

7. Check the browser console for logs confirming authentication

## Step 6: Domain Validation

The system automatically validates that users have a `@ub.edu.ph` email address:
- If they sign in with a non-UB email, they're logged out with an error message
- Only UB domain emails are allowed

## Troubleshooting

### "Supabase environment variables are missing"
- Make sure `.env.local` exists with correct variable names
- Variable names must start with `VITE_` (not `NEXT_PUBLIC_`)
- Restart your dev server after updating `.env.local`

### Redirect loop or "Invalid API Key"
- Check that the Redirect URL in Google Cloud Console includes your exact domain
- Verify the Supabase URL and Anon Key are correct
- Check browser console for specific error messages

### Email validation failing
- Make sure your test email ends with `@ub.edu.ph`
- Check the email domain check in AuthContext.jsx

### Profile not being created
- Check Supabase SQL Editor for any errors
- Verify the `profiles` table exists and RLS policies are correct
- Check the browser console for database errors

## Files Modified for SSO

1. **`.env.local`** - Environment variables (Vite format)
2. **`src/context/AuthContext.jsx`** - Complete OAuth handling
3. **`src/pages/AuthCallback.jsx`** - OAuth callback page
4. **`src/pages/SignInPage.jsx`** - Already has Google OAuth button
5. **`src/lib/supabaseClient.js`** - Already configured

## Next Steps

- Add email verification flow (optional)
- Implement role-based access control in your dashboards
- Add profile management page for users to update roles
- Set up email notifications for new sign-ups
