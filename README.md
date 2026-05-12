# task-to-invoice-automation
Automated Task-to-Invoice system using Google Apps Script with live currency conversion, Google Docs template, and PDF generation stored in Google Drive

##  Overview
This project is a fully automated **Task-to-Invoice generation system** built using Google Apps Script. It allows users to log tasks, fetch live currency rates, and automatically generate professional client-ready invoices in PDF format, stored neatly in Google Drive.

This system simulates a real-world freelancer billing workflow with automation, API integration, and document processing.

---

##  Tech Stack
- Google Apps Script
- Google Sheets (Database)
- Google Docs (Invoice Template)
- HTML Service (Web App UI)
- Public Currency Exchange API
- Google Drive API (via Apps Script)

---

##  Key Features

### 1. Task Logging System
- Simple web app UI for entering:
  - Task Name  
  - Hours Worked  
  - Hourly Rate  
  - Client Name  
  - Currency Type  
- Data is stored in Google Sheets as a database.

---

### 2. Live Currency Conversion
- Fetches real-time exchange rates using a public Currency API
- Converts client currency dynamically (e.g., USD → INR)
- Handles JSON parsing and API error handling

---

### 3. Automated Invoice Generation
- Uses a Google Docs template with placeholders:
  - {{CLIENT_NAME}}
  - {{TASK_NAME}}
  - {{HOURS}}
  - {{RATE}}
  - {{TOTAL}}
  - {{DATE}}
- Automatically replaces placeholders with real data
- Generates a new invoice document

---

### 4. PDF Conversion & Storage
- Converts Google Doc invoice into PDF
- Renames file in format:
-  Stores file in Google Drive

---

### 5. Organized Drive Structure
- Creates a master invoice folder
- Automatically creates subfolders per client
- Stores invoices in correct client folder

---

## System Workflow
1. User enters task details in Web App  
2. Data stored in Google Sheets  
3. System fetches live currency rate from API  
4. Invoice is generated using Google Docs template  
5. Document is converted to PDF  
6. File is saved in Google Drive (organized structure)  

---

## 🔗 Important Links

-  Web App: [https://script.google.com/macros/s/AKfycbyOGUHs2bypLW6vak251JOKFj-xvE7UhtkDU2AIOPzsJk3DXra6UqWs3R-WviX_V_nsYw/exec]  
- Google Sheet (Database): [https://docs.google.com/spreadsheets/d/1R4XVtFbD5xn31ORKdczmiGchmCDA8TVObW03GhZVw08/edit?gid=0#gid=0]  
-  Google Drive Folder: [https://drive.google.com/drive/folders/1iJBiYcz79Zytb6XWGt7F2Z--uqd1fepi?usp=sharing]  
-  Apps Script Project: [https://script.google.com/home/projects/130AaTeDkjy0o3lfL8LUzi9X8x-r_GZZr8rcFaNyyBMGUuRA4mvemGHH7/edit]

---

##  Highlights
- No hardcoded values used  
- Fully dynamic invoice generation  
- Real-time API integration  
- Modular and scalable code structure  
- Error handling for API failures  
- Professional invoice formatting  

---

##  Screenshots
<img width="464" height="478" alt="image" src="https://github.com/user-attachments/assets/4f71b94e-8ef3-4501-8a3f-a5cfea664990" />


---

##  Challenges Faced
- Handling JSON responses from API  
- Managing Google Drive folder automation  
- Replacing dynamic placeholders in Docs  
- Ensuring consistent PDF formatting  
- Error handling for missing API data  

---

##  Possible Upgrades (Bonus Ideas)
- Multi-currency support  
- GST/Tax calculation module  
- Email invoice directly to client  
- Dashboard for invoice history  
- Download button in UI  
- Authentication system for users  

---

##  Author
**Suniti Jha**  
B.Tech Student | Data Engineering / Software Development Enthusiast  
