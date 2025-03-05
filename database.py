from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
organization = MongoClient(os.getenv("MONGO_URL"))
db = organization["women_safety"]
reports_collection = db["reports"]
