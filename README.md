# **Women’s Workplace Safety & Support System (SAKHI)**

**SAKHI** is a web-based platform designed to provide a safe and supportive space for women across various workplaces to report incidents such as harassment, verbal abuse, or unsafe working conditions. The system allows female employees to securely report workplace incidents, receive AI-driven mental health and legal guidance through a chatbot, and ensures confidentiality and compliance with **The POSH Act, 2013**. The system generates reports and sends them to the Internal Complaints Committee (IIC) for redressal.

---

## **Features**

- **Anonymous Reporting**: Allows users to report incidents anonymously or with their details (name, email, employee ID).
- **Incident Classification**: Uses NLP to detect the severity of the incident (high or low).
- **AI-Driven Support**: If the incident severity is low, users can interact with a chatbot for mental health support.
- **PDF Report Generation**: For high-severity incidents, a detailed report is generated and sent to the Internal Complaints Committee (IIC).
- **Legal Awareness**: Provides basic legal guidance related to workplace harassment and informs users about their rights under The POSH Act, 2013.
- **Data Privacy**: Ensures complete confidentiality and compliance with relevant workplace laws.

---

## **Technology Stack**

- **Backend**: 
  - **Python (FastAPI)** for handling NLP and generating PDF reports.
  - **Node.js** for handling API requests, interacting with the Gemini API, and managing chat functionality.
  
- **NLP (Natural Language Processing)**: 
  - Pre-trained **DistilBERT** model (via **Hugging Face Transformers**) for classifying the severity of reported incidents.

- **Frontend**: 
  - **Bootstrap** for responsive, user-friendly interfaces.
  
- **Chatbot**: 
  - **Gemini API** for providing emotional support through an AI-driven chatbot.

- **PDF Generation**: 
  - **Python libraries** such as **reportlab** for generating the detailed incident report in PDF format.

---

## **How to Run the Project**

### **1. Clone the Repository**
git clone https://github.com/your-username/sakhi-workplace-safety.git
cd sakhi-workplace-safety

### **2. Install Backend Dependencies**
cd python-backend
pip install -r requirements.txt

cd node-backend
npm install

npm start

## OUR Design
![Screenshot](file:///C:/Users/DELL/Pictures/Screenshots/Screenshot%202025-03-06%20111301.png)




