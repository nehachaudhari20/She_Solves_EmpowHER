from fastapi import APIRouter, HTTPException
from database import reports_collection
from models import Report
from services.report_gen import generate_pdf

router = APIRouter()

@router.port("/")
async def submit_report(report: Report):
    