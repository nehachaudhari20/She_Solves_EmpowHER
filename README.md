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

### **Business Model for SAKHI: Women’s Workplace Safety & Support System**

**Value Proposition**:
- **For Women Employees**: Secure, anonymous reporting of workplace incidents (e.g., harassment), AI-driven emotional support, and legal guidance based on the POSH Act.
- **For Employers**: Ensures compliance with workplace safety laws, automates incident management, and provides data-driven insights for improving workplace culture.

**Revenue Model**:
1. **Subscription-based Model**: Organizations pay based on employee count for access to the platform's features.
2. **Freemium Model for Employees**: Free basic services with premium mental health and legal features.
3. **Data Analytics Reports**: Selling anonymized data insights to organizations for improving workplace culture.
4. **Legal Partnering**: Partnering with law firms for additional services.

**Target Audience**:
- Women employees across industries.
- Organizations seeking to provide a safe workplace and comply with legal standards.

**Marketing Strategy**:
- Target HR and legal teams in companies.
- Content marketing, partnerships with NGOs, webinars, and referral programs.

**Cost Structure**:
- Development, AI infrastructure, marketing, legal consultation, and server costs.

**Scalability**:
- Expand globally, continuously improve AI models, and add more premium features for employers and employees.

**Competitive Advantage**:
- Focus on privacy, AI-driven support, and a comprehensive solution for workplace safety, legal guidance, and emotional support.


## FRONTEND DESIGN

![Screenshot 2025-03-06 114136](https://github.com/user-attachments/assets/9e2791c0-9ab1-4d45-8dcd-1c2852cdbad6)

![Screenshot 2025-03-06 114129](https://github.com/user-attachments/assets/012528ba-7058-4690-81a2-244d9622cd71)

![Screenshot 2025-03-06 114121](https://github.com/user-attachments/assets/78276bc5-0f7a-4785-a2e3-ca580f302ae0)

![Screenshot 2025-03-06 114114](https://github.com/user-attachments/assets/71098be3-c05b-432a-92bd-0ed479614ca1)

![Screenshot 2025-03-06 114104](https://github.com/user-attachments/assets/edc0b671-e627-4570-a4b1-ee1b2de6faff)

![Screenshot 2025-03-06 114052](https://github.com/user-attachments/assets/4ae3aec5-53cc-4d26-b1d7-9db5447cb320)

![Screenshot 2025-03-06 112216](https://github.com/user-attachments/assets/2748099f-7037-4fcd-b3fe-227f8d9e0350)

![Screenshot 2025-03-06 111336](https://github.com/user-attachments/assets/f899f203-a89b-4b35-a038-aa7f4dd17a67)

![Screenshot 2025-03-06 111327](https://github.com/user-attachments/assets/e77e45ab-425b-4552-a0ce-a6aa21154944)

![Screenshot 2025-03-06 111301](https://github.com/user-attachments/assets/b01e1b78-4530-477f-a976-0c9f8bac76a7)

![image](https://github.com/user-attachments/assets/57b1b9fe-361c-49dd-8e98-51e49e2db4cc)


