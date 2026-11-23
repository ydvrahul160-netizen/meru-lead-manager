# Meru Lead Manager

A full-stack MERN application designed to help sales teams manage, track, and organize their leads through a clean and responsive CRM dashboard.

## Features

- **Dashboard:** View total leads and status-wise statistics.
- **Add Leads:** Create new leads with name, email, phone, company, source, and status.
- **Manage Leads:** Edit and delete existing leads.
- **Search:** Find leads by name.
- **Filter:** Filter leads by their current status.
- **Validation:** Frontend and backend form validation.
- **Responsive UI:** Clean interface that adapts to different screen sizes.
- **Database:** Store lead records in MongoDB.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

## Project Structure

```text
meru-lead-manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd meru-lead-manager
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder using `.env.example` as a reference.

Configure:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file using `.env.example` as a reference.

Configure:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## API Endpoints

Base URL: `/api/leads`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get all leads |
| GET | `/api/leads/:id` | Get a single lead |
| POST | `/api/leads` | Create a new lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

### Search and Filter

Search leads by name:

`GET /api/leads?search=Rahul`

Filter leads by status:

`GET /api/leads?status=New`

Both can be combined:

`GET /api/leads?search=Rahul&status=New`

## Lead Fields

| Field | Description |
|---|---|
| Name | Lead's full name |
| Email | Valid email address |
| Phone | Contact number |
| Company | Company name |
| Source | Website, Referral, LinkedIn, Social Media, Advertisement, Other |
| Status | New, Contacted, Qualified, Lost |

## Validation

- Required fields cannot be empty.
- Email addresses must be valid.
- Phone numbers must follow the accepted format.
- Lead status and source must use supported values.
- Invalid requests return appropriate API error responses.

## Environment Variables

Never commit actual `.env` files or database credentials.

Use `.env.example` files as configuration templates.

## License

This project was developed as a MERN Stack internship assignment.