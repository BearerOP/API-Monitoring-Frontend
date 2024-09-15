# API Monitoring Backend

This project provides the backend services for API monitoring, including periodic health checks using GitHub Actions cron jobs. The backend is built with Node.js, Express, and MongoDB, and incorporates additional libraries for authentication, logging, and database management.

## Features

- **API Monitoring**: Regularly logs and monitors the health of registered APIs.
- **Periodic Health Checks**: Uses GitHub Actions to perform health checks and ensure API uptime.
- **User Authentication**: Secure authentication mechanisms for users.
- **Database Management**: Stores user and API log data in MongoDB.
- **Email Notifications**: Sends email alerts for critical errors via Nodemailer.

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **GitHub Actions (for cron jobs)**
- **Firebase (for notifications)**
- **Axios (for HTTP requests)**

## Setup

### 1. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed. Run the following command to install all dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of your project with the following environment variables:

```bash
PORT=3000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
EMAIL_USER=<your_email_user>
EMAIL_PASS=<your_email_password>
ENVIRONMENT=production # Or 'development'
```

### 3. Start the Application

To start the backend server, use the following command:

```bash
npm start
```

By default, the server will run on `http://localhost:3000`.

### 4. Set Up GitHub Actions for Cron Jobs

The project uses GitHub Actions to execute a cron job every 5 minutes, which checks the health of the API.

1. **Create a GitHub Workflow**: Add a new workflow file at `.github/workflows/health-check.yml`:

   ```yaml
   name: Periodic Health Check

   on:
     schedule:
       - cron: '*/5 * * * *' # Runs every 5 minutes
     workflow_dispatch: # Allows manual triggering from the GitHub Actions UI

   jobs:
     health-check:
       runs-on: ubuntu-latest

       steps:
         - name: Make HTTP Request
           run: |
             curl -X POST https://your-app-name.domain.com/api/health-check
   ```

2. **Commit and Push**: Commit the workflow file and push it to your GitHub repository:

   ```bash
   git add .github/workflows/health-check.yml
   git commit -m "Add periodic health check cron job"
   git push origin main
   ```

3. **View Actions**: Navigate to the **Actions** tab in your GitHub repository to monitor the cron job's execution and view logs.

### 5. Project Structure

The project is organized as follows:

```bash
├── .github
│   └── workflows
│       └── health-check.yml        # GitHub Actions workflow for cron jobs
├── public                          # Publicly accessible assets
├── src
│   ├── models                      # Mongoose models for User and ApiLog
│   ├── routes                      # API routes for user and log management
│   ├── services                    # Services for processing API logs
│   └── controllers                 # Controllers for route handling
├── db
│   └── dbconnection.js             # MongoDB connection logic
├── .env                            # Environment variables
├── package.json                    # Project dependencies and metadata
└── index.js                        # Main application entry point
```

### 6. License

For issues or inquiries, please visit the [GitHub Issues](https://github.com/BearerOP/API-Monitoring-backend/issues) page.

---
