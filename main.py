from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from starlette.requests import Request
from routes import report_router, severity_router, chatbot_router
from routes.report import router as report_router
from routes.severity import router as severity_router
from routes.chatbot import router as chatbot_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD



=======
app.mount("/static", StaticFiles(directory="static"), name="static")    

templates = Jinja2Templates(directory="templates")
>>>>>>> 8651c12512a3f7b138427db3b132272181e9bc12

app.include_router(report_router, prefix="/report", tags=["Incident Report"])
app.include_router(severity_router, prefix="/severity", tags=["Severity Analysis"])
app.include_router(chatbot_router, prefix="/chatbot", tags=["SAKHI"])

<<<<<<< HEAD
app.mount("/static", StaticFiles(directory="static"), name="static")    
templates = Jinja2Templates(directory="templates")
=======
>>>>>>> 8651c12512a3f7b138427db3b132272181e9bc12

@app.get("/", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

<<<<<<< HEAD
@app.get("/", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("sign.html", {"request": request})

@app.get("/", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})

@app.get("/", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})

@app.get("/", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("chatbot.html", {"request": request})

=======
>>>>>>> 8651c12512a3f7b138427db3b132272181e9bc12

@app.get("/")
def root():
    return {"message" : " running API"}
