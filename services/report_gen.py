from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

def generate_pdf(report_data):
    pdf_path = f"reports/{report_data['incident_id']}.pdf"
    os.makedirs("reports", exist_ok = True)
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.drawString(100, 750, "Incident Report")
    c.drawString(100, 730, f"Incident ID: {report_data['incident_id']}")
    c.drawString(100, 710, f"User ID: {report_data['user_id']}")
    c.drawString(100, 690, f"Description: {report_data['description']}")
    c.drawString(100, 670, f"Incident Type: {report_data['incident_type']}")
    c.drawString(100, 650, f"Date & Time: {report_data['date_time']}")
    c.drawString(100, 630, f"Location: {report_data['location']}")
    c.drawString(100, 610, f"Severity: {report_data['severity']}")
    c.save()
    return pdf_path



