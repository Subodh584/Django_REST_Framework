import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cfehome.settings')
django.setup()

from django.contrib.auth.models import User

# Create a test user
username = 'testuser'
password = 'testpass123'
email = 'test@test.com'

if User.objects.filter(username=username).exists():
    print(f"User '{username}' already exists!")
    user = User.objects.get(username=username)
    user.set_password(password)
    user.save()
    print(f"Password updated for user '{username}'")
else:
    user = User.objects.create_user(username=username, email=email, password=password)
    print(f"User '{username}' created successfully!")

print(f"\nYou can now login with:")
print(f"Username: {username}")
print(f"Password: {password}")
