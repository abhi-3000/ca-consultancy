NK Consultancy Platform
Expert Guidance, Digitally Delivered.
A full-stack MERN application designed to digitalize my father's traditional Chartered Accountancy practice, replacing high-friction manual workflows with a seamless, modern, and transparent service delivery platform.

Live Link: https://nk-zeta-fawn.vercel.app/

Attaching some screenshots of the platform: 
<img width="2177" height="1162" alt="Screenshot 2025-09-22 201826" src="https://github.com/user-attachments/assets/3c143ed6-d3a5-49ab-bb00-d1c2fad75252" />
<img width="2175" height="1159" alt="Screenshot 2025-09-22 201839" src="https://github.com/user-attachments/assets/9ae07da3-8793-4498-8b00-8157e41ce58e" />
<img width="2180" height="1163" alt="Screenshot 2025-09-22 202107" src="https://github.com/user-attachments/assets/1e81273e-b011-4447-acf0-cdc2f4c10739" />
<img width="1685" height="1020" alt="Screenshot 2025-09-22 204322" src="https://github.com/user-attachments/assets/16909d4d-a8e8-481c-9091-a0daa8f08e4b" />

Client-Side screenshots:
<img width="2179" height="1163" alt="Screenshot 2025-09-22 202344" src="https://github.com/user-attachments/assets/8cebe0bb-c662-429d-bf3e-5ab59a26fc1e" />
<img width="2186" height="1169" alt="Screenshot 2025-09-22 202612" src="https://github.com/user-attachments/assets/5e85f2cd-cc58-4291-a622-7a4544749668" />
<img width="2176" height="1158" alt="Screenshot 2025-09-22 202626" src="https://github.com/user-attachments/assets/af995a59-5260-4608-9112-71979ae6ee0c" />

Admin (CA)-Side screenshots:
<img width="2179" height="1165" alt="Screenshot 2025-09-22 202846" src="https://github.com/user-attachments/assets/2ce1003a-8775-4591-9ccd-ac6ec8054b27" />
<img width="1816" height="1052" alt="Screenshot 2025-09-22 203324" src="https://github.com/user-attachments/assets/b55c224d-b013-46fb-b120-e255c9c4c30c" />
<img width="400" height="823" alt="Screenshot 2025-09-22 203427" src="https://github.com/user-attachments/assets/75cd9c12-4bca-49e6-805d-90d5637c38ae" />
<img width="2182" height="1166" alt="Screenshot 2025-09-22 203450" src="https://github.com/user-attachments/assets/a857b170-0a56-4d42-84a2-c3c1d9c6e75d" />


About This Project
As a driven MERN stack developer, I initiated and engineered this platform from the ground up to solve a real-world problem: digitalizing my father's traditional CA consultancy. The goal was to eliminate the inefficiencies of manual paperwork and client communication by creating a secure, user-centric application that provides a seamless experience for both the service provider and the client.

This project is a complete, end-to-end solution that handles everything from initial service discovery to secure document exchange and online payments, all wrapped in a premium, futuristic user interface.

Core Features
For Clients:

Secure Authentication: Simple and secure user registration and login powered by Clerk.

Dynamic Service Catalog: Browse a detailed, filterable list of all available services.

Seamless Application Flow: Apply for any service via dynamic forms generated directly from a database schema.

Interactive Dashboard: A dedicated client dashboard with an at-a-glance overview, a filterable list of all requests with expandable details, and a complete billing history.

Secure Document Exchange: Upload and download sensitive documents directly through the platform.

Integrated Payments: Pay invoices securely online using the Razorpay payment gateway.

For the Admin (CA):

Admin Mission Control: A powerful, role-protected dashboard to manage the entire business.

KPI Visualization: An "Overview" tab with key performance indicators like new requests, services in progress, pending payments, and monthly revenue.

Master Workspace: A comprehensive "All Requests" section with a live search bar and status filters.

Integrated Actions: Manage each request directly from its "mission control" card, with tools to update status, upload completion documents, and issue invoices.

Business Analytics: A dedicated reports section with interactive charts (powered by Recharts) to visualize service popularity and track top clients by revenue.

Tech Stack:

Frontend



Backend



Database



APIs & Services



Deployment



Environment Variables
To run this project locally, you will need to create .env files in both the frontend and backend directories.

backend/.env

MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173

frontend/.env

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_URL=http://localhost:5000

Local Setup and Installation
Clone the repository:

git clone [https://github.com/your-username/ca-consultancy-platform.git](https://github.com/your-username/ca-consultancy-platform.git)
cd ca-consultancy-platform

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Set up your environment variables as described above.

Run the backend server:

cd ../backend
npm run dev

Run the frontend server:

cd ../frontend
npm run dev
