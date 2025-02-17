import secrets
# Generates a secret key for production deployment
print(secrets.token_hex(24))