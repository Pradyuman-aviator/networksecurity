import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient

load_dotenv()

MONGO_DB_URL = os.getenv("MONGO_DB_URL")

if not MONGO_DB_URL:
    raise ValueError("MONGO_DB_URL environment variable is not set. Check your .env file.")

# Create a new client and connect to the server
client = MongoClient(MONGO_DB_URL)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")