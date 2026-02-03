// Seed script removed to prevent accidental admin creation.
// Use the API endpoint POST /api/auth/register-admin to create the first admin.
// Example (curl):
// curl -X POST "$BACKEND_URL/api/auth/register-admin" \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Your Name","email":"admin@example.com","password":"YourStrongPassword"}'

console.log("This seed script is intentionally disabled. Use POST /api/auth/register-admin to create the first admin.");
process.exit(0);
