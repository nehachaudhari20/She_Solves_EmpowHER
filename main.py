from fastapi import FastAPI
from dotenv import load_dotenv
from routes import report, severity, chatbot

app = FastAPI()
app.include_router(report.router, prefix="/report", tags = ["Incident Report"])
app.include_router(severity.router, prefix="/severity", tags = ["severity Analysis"])
app.include_router(chatbot.router, prefix="/chatbot", tags = ["SAKHI"])

@app.get("/")
def root():
    return {"message" : " running API"}