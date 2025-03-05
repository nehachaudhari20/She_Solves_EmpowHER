from fastapi import APIRouter
from services.nlp_analysis import classify_severity
#from database import reports_collection

router = APIRouter()

@router.post("/")
async def check_severity(data: dict):
    severity = classify_severity(data["incident_text"])
    ##reports_collection.update_one({"incident_id": data["incident_id"]}, {"$set": {"severity": severity}})
    return {"incident_id": data["incident_id"], "severity": severity}