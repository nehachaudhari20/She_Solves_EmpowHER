from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from starlette.requests import Request
from routes.report import router as report_router
from routes.severity import router as severity_router
from routes.chatbot import router as chatbot_router
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(report_router, prefix="/report", tags=["Incident Report"])
app.include_router(severity_router, prefix="/severity", tags=["Severity Analysis"])
app.include_router(chatbot_router, prefix="/chatbot", tags=["SAKHI"])

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")    
templates = Jinja2Templates(directory="templates")

# Define routes with UNIQUE paths
@app.get("/", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/sign-in", response_class=HTMLResponse)
async def serve_sign(request: Request):
    return templates.TemplateResponse("sign-in.html", {"request": request})

@app.get("/sign-up", response_class=HTMLResponse)
async def serve_signup(request: Request):
    return templates.TemplateResponse("sign-up.html", {"request": request})

@app.get("/form", response_class=HTMLResponse)
async def serve_form(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})

@app.get("/chatbot", response_class=HTMLResponse)
async def serve_chatbot(request: Request):
    return templates.TemplateResponse("chatbot.html", {"request": request})

@app.get("/chatbot/context")
async def get_chatbot_context():
    # This endpoint will be used by chatbot.js to get the incident context
    return {"message": "How can I help you with your situation?"}

@app.get("/api-status")
def root():
    return {"message": "API running successfully"}