# PDFtoCalendar

PDFtoCalendar is a web application that simplifies the process of extracting academic schedules from PDF documents and converting them into editable calendar events. Users can upload a PDF, review the automatically extracted data, make adjustments, and add the events to their Google Calendar with a single click.

## Features

-   **PDF Upload & Display**: Easily upload your PDF syllabus or schedule via a drag-and-drop interface and view it directly in the app.
-   **Automated Data Extraction**: Leverages a backend service to perform OCR and extract structured event data, including titles and dates, from the PDF.
-   **Editable Event Table**: All extracted events are displayed in an intuitive, editable table. You can review, modify, or delete entries, as well as add new ones manually.
-   **Google Calendar Integration**: Seamlessly syncs the events from the table to your primary Google Calendar using secure OAuth2 authentication managed by Clerk.
-   **Secure Authentication**: Built-in user authentication using Clerk, allowing for easy sign-in with a Google account.
-   **Modern UI**: A clean, responsive interface built with Next.js, Tailwind CSS, and Shadcn/ui.

## How It Works

1.  **Sign In**: Authenticate into the application using your Google account.
2.  **Upload PDF**: On the home page, upload your PDF document. The app will display the PDF on the left panel.
3.  **Extraction**: The application sends the PDF to a backend service, which extracts events and populates them in an editable table on the right panel.
4.  **Review and Edit**: Review the extracted data. You can edit any field, delete rows, or add new events manually to the table.
5.  **Sync to Calendar**: Once you are satisfied with the event list, click the "Add to Google Calendar" button to sync all the events.

## Technology Stack

-   **Frontend**: Next.js (App Router), React 19, TypeScript
-   **Authentication**: Clerk (for user management and Google OAuth)
-   **UI Components**: Shadcn UI, Radix UI, Tailwind CSS
-   **API Communication**: Axios
-   **File Handling**: React Dropzone

***Note**: This repository contains the frontend application. The PDF processing and data extraction are handled by a separate backend service, which is not included in this repository. This service is expected to be running at `http://localhost:8000` during development.*

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v20 or later)
-   npm, yarn, or pnpm
-   A running instance of the backend PDF processing service at `http://localhost:8000`.

### 1. Clone the Repository

```bash
git clone https://github.com/nitinbhaskar7/PdftoCalendar.git
cd PdftoCalendar
```

### 2. Install Dependencies

Install the project dependencies using your preferred package manager.

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add your Clerk API keys. You can get these from your Clerk dashboard.

You must also enable Google as a Social Connection (OAuth provider) in your Clerk dashboard and add the `calendar` scope to allow the application to create events.

```ini
# .env.local

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Run the Development Server

Start the Next.js development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.