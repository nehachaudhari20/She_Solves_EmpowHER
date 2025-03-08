from fastapi import APIRouter, HTTPException
from services.nlp_analysis import classify_severity
import logging
#from database import reports_collection

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/")
async def check_severity(data: dict):
    '''severity = classify_severity(data["incident_text"])
    ##reports_collection.update_one({"incident_id": data["incident_id"]}, {"$set": {"severity": severity}})
    return {"incident_id": data["incident_id"], "severity": severity}'''

    try:
        if "incident_text" not in data:
            raise HTTPException(status_code=400, detail="incident_text is required")
        
        logger.info(f"Received severity check request for incident: {data.get('incident_id', 'unknown')}")
        severity = classify_severity(data["incident_text"])
        
        logger.info(f"Severity classification result: {severity}")
        return {
            "incident_id": data.get("incident_id", "unknown"),
            "severity": severity,
            "status": "success"
        }
    except Exception as e:
        logger.error(f"Error in check_severity: {e}")
        raise HTTPException(status_code=500, detail=str(e))