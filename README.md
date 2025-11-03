Table of Contents

Overview

Setup & Installation

Tech Stack

Architecture

Design Decisions & Trade-offs

Known Limitations

Time Breakdown

Screenshots / GIFs

Future Improvements

Overview

This platform allows users to submit text documents, perform AI-based analysis (summarization, sentiment analysis, and named entity recognition), and view results in real-time using a streaming interface.

Setup & Installation
Prerequisites

Node.js >= 20

npm or yarn

Hugging Face API token (for AI inference)

Git

Installation
git clone https://github.com/<your-username>/ai-document-analysis.git
cd ai-document-analysis
npm install

Environment Variables

Create a .env file in the root directory:

HUGGINGFACE_API_TOKEN=<your_huggingface_api_token>

Run Locally
npm run dev


Visit http://localhost:3000 to access the platform.

Tech Stack

Next.js 14: Server-side rendering & edge runtime

shadcn: Component-based UI

Tailwind CSS: Styling

Zustand: Global state management

Zod: Form validation

Hugging Face Inference API: AI tasks (summarization, sentiment, NER)

Sonner: Toast notifications

Reasoning:
Zustand keeps state management simple and lightweight, avoiding boilerplate Redux code.
Zod ensures robust validation with minimal overhead.

Architecture

Frontend

HomePage: main container

InputCard: handles text input & file upload

DocumentList & DocumentCard: display documents & results

TaskSelector & FileActions: reusable UI components

State Management

useDocumentsStore: global state for documents

Backend / API

POST /api/documents/analyze: streams AI analysis results using server-sent events

Streaming

Each task streams partial results to provide real-time feedback ( live updates)

Design Decisions & Trade-offs

Zustand vs Redux: Chose Zustand for simplicity, lightweight global state. Redux was overkill for this small-medium app.

Streaming via SSE: Gives real-time feedback, but slightly more complex implementation than a simple fetch.

Text Chunking: For summarization, we stream words to show progressive output. This avoids freezing the UI for long documents.

Known Limitations

Hugging Face free-tier API limits throughput → can hit 429 rate-limit errors.

Large documents (>5000 chars) are truncated.

NER may produce overlapping or partial entities.

No authentication implemented.

Time Breakdown
Task	Hours Spent
Project setup & architecture	3
UI development (components & styling)	8
Zustand store & hooks	4
SSE backend streaming	6
Hugging Face API integration	4
Validation & error handling	3
README & documentation	2
Screenshots / GIFs


<img width="613" height="260" alt="submit" src="https://github.com/user-attachments/assets/811dd8ee-3000-4962-8da5-652504ef47d4" />
<img width="573" height="505" alt="reanalze" src="https://github.com/user-attachments/assets/1345f039-e2fa-4d1b-a2ae-0745749735fd" />


Or GIF demo: ./screenshots/demo.gif

Future Improvements

Implement authentication & user management

Allow larger document uploads with pagination or chunking

Improve NER visualization with color-coded entities

Retry logic for rate-limit / network errors

Dark mode support
