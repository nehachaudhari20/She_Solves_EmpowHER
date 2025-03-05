from pymongo import mongo_client
import os

from dotenv import load_dotenv

load_dotenv()
organization = mongo_client(os.getenv("MONGO_URL"))
db = organization["women_safety"]
reports_collection = db["reports"]
