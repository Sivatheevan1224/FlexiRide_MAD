# Security Policy

## Test Credentials

For development and testing purposes, the following test accounts are available. **Never commit actual passwords to the repository.**

### Demo Accounts

**Customer Account:**
- Email: `user@flexiride.com`
- Password: Set manually in Firebase Console

**Admin Account:**
- Email: `admin@flexiride.com`
- Password: Set manually in Firebase Console

### Creating Test Users

1. Go to Firebase Console → Authentication
2. Click "Add user"
3. Enter email and strong password
4. Add user document to Firestore `users` collection with appropriate role

## Reporting a Vulnerability

If you discover a security vulnerability, please email the project maintainers immediately.

## Best Practices

- ✅ Never commit passwords, API keys, or secrets
- ✅ Use environment variables for sensitive data
- ✅ Keep `serviceAccountKey.json` in `.gitignore`
- ✅ Rotate credentials regularly
- ✅ Use strong passwords for all accounts
- ✅ Enable Firebase security rules in production

## Protected Files

The following files contain sensitive data and must never be committed:

- `.env` (environment variables)
- `backend/serviceAccountKey.json` (Firebase service account)
- Any file containing API keys or passwords

## Environment Variables

Create a `.env` file based on `.env.example` and add your actual Firebase configuration. This file is gitignored.
