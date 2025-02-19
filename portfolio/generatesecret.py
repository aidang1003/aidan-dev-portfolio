import secrets
import os

# Generates a secret key for production deployment
print(secrets.token_hex(24))


print(os.getenv('$TEST_SECRET_KEY'))
print(os.environ.get('TEST_SECRET_KEY'))
