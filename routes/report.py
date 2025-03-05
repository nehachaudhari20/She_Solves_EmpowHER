from fastapi import APIRouter, HTTPException
from database import reports_collection
from models import Report
from services.report_gen import generate_pdf

router = APIRouter()

@router.port("/")
async def submit_report(report: Report):
    report_data = report.model_dump()
    reports_collection.insert_one(report_data)


    pdf_path = generate_pdf(report_data)

    return{"message": "Report is submitted successfully!!", "pdf": pdf_path}