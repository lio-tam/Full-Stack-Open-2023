sequenceDiagram

User ->> Browser: give input and click submission
Note over Browser: Form data prepared
Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
Note right of Browser: HTTP POST request to /new_note
Server-->>Browser: 302 URL redirect
Note right of Browser: The server responds with HTTP 302 redirecting to /notes
Server->>Server: Create new note object
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes

Server-->>Browser: HTML document
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->>Browser: the css file
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server-->>Browser: the JavaScript file
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->>Browser: the raw data
