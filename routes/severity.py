from fastapi import APIRouter, HTTPException
from services.nlp_analysis import analyzer
import logging
#from database import reports_collection
import time
router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/")
async def check_severity(data: dict):
    '''severity = classify_severity(data["incident_text"])
    ##reports_collection.update_one({"incident_id": data["incident_id"]}, {"$set": {"severity": severity}})
    return {"incident_id": data["incident_id"], "severity": severity}'''
    
    try:
        if "incident_text" not in data:
            logger.error("Missing incident_text in request")
            raise HTTPException(status_code=400, detail="incident_text is required")
        
        incident_text = data["incident_text"]
        incident_id = data.get("incident_id", f"SK-{int(time.time())}")
        
        logger.info(f"Processing severity check for incident: {incident_id}")
        logger.info(f"Text length: {len(incident_text)} characters")
        
   
        severity = analyzer.classify_severity(incident_text)
        
        response_data = {
            "incident_id": incident_id,
            "severity": severity,
            "status": "success"
        }
        
        logger.info(f"Severity check complete: {response_data}")
        return response_data
        
    except Exception as e:
        logger.error(f"Error in check_severity: {e}")
        raise HTTPException(status_code=500, detail=str(e))