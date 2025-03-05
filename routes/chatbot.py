from fastapi import APIRouter
import google.generativeai as genai
import os

router = APIRouter()
genai.configure(api_key=os.getenv("AIzaSyB38R7k_1Mp-LeVpznoumLhPnudmPhvmYg"))    
model = genai.GenerativeModel("gemini-1.5-flash",
                              system_instruction= "you are a women mental health assistant system and a support system for a women workplace distress. start a message directly by asking hi how are you. Don't respond with long paragraphs")
##response = model.generate_content("hi i am suffering from depression. a collegue my office sexually abused me")
##print(response.text)

@router.post("/")
async def chatbot_reponder(data: dict):
    reponses = model.generate_content(data["mesage"])
    return {'response': response.text}