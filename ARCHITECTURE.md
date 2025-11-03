Architecture Overview

This document explains the architectural decisions behind the AI Document Analysis Platform, covering state management, SSE streaming, error handling, data persistence, concurrency, scaling, and security considerations.

1. State Management Rationale

Zustand is used for global state management.

Lightweight and minimal boilerplate.

Easy to integrate with React hooks (useDocumentsStore) to manage the list of documents, their status, and results.

Enables localized state updates without triggering unnecessary re-renders.

Why not Redux?

Redux introduces more boilerplate for a relatively small app.

Zustand’s API is simpler, especially for streaming updates where document state is incrementally updated.

2. SSE (Server-Sent Events) Implementation

The backend streams partial results of AI tasks (summarization, sentiment, NER) using SSE.

Each task streams chunks of data:

Summarization streams words progressively.

Sentiment streams analysis completion.

NER streams entities as they are detected.

The front-end listens to the SSE stream and updates the global document state in real-time.

Provides live feedback without needing to refresh or poll the server.

Approach Highlights:

ReadableStream is used on the edge runtime.

Each chunk is serialized as JSON with data: prefix per SSE protocol.

Backoff and retry logic implemented for network or rate-limit issues.

3. Error Handling Strategy

Rate limits (HTTP 429): Exponential backoff with retries.

Model loading (HTTP 503): Display “model warming up” message and retry after a fixed delay.

Network errors: Show clear toast notifications and allow manual retry.

Errors in streaming update document state as status: "error" with errorMessage for user clarity.

4. Data Persistence

Currently, documents are stored in-memory using Zustand.

Each document object contains:

id

title

content

status (idle | processing | completed | error)

Task results (summary, sentiment, entities)

Future improvements:

Persist data to a database (PostgreSQL / MongoDB) for longer-term storage.

Ensure recovery from server restarts.

5. Concurrent Queue Management

Multiple analyses can be triggered concurrently.

Frontend queue: Each document is analyzed independently; state updates are applied as chunks arrive.

Backend concurrency: SSE streams allow multiple requests in parallel.

No strict rate limiting on front-end; Hugging Face API limits are handled via backoff and retry logic.

6. Scalability Considerations

Edge runtime and SSE allow low-latency responses for multiple concurrent users.

Streaming results prevent large document blocking and reduce server memory usage.

Scaling options:

Deploy multiple edge functions or serverless functions.

Introduce Redis or another message queue for task orchestration.

Cache recent results for frequent requests.

7. Security Considerations

Hugging Face API token stored in environment variables (.env).

Avoid exposing tokens in client code; serverless endpoints proxy requests.

Basic validation using Zod to prevent invalid data submission.

CORS policies enforced via Next.js API routes.

Future improvements: user authentication & access control.

8. Future Improvements

Persistent database storage (PostgreSQL / MongoDB).

User authentication & session management.

Task prioritization in a backend queue.

Advanced error logging & monitoring.

UI enhancements for streaming progress visualization.