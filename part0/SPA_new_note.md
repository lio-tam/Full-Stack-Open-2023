:::mermaid
sequenceDiagram
    participant User as User
    participant Browser as Browser
    participant Server as Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>Browser: HTML content
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: CSS file
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>Browser: JavaScript file

    Note over Browser: Browser loads SPA with JavaScript (spa.js)
    Browser->>Server: Request for notes data (GET /data.json)
    Server-->>Browser: JSON data of notes
    Note over Browser: Browser renders notes using DOM-API

    User->>Browser: Enters note and submits
    Note over Browser: JavaScript intercepts form submit
    Browser->>Browser: Adds note locally to the notes list and rerenders notes
    Browser->>Server: Sends note data (POST /new_note_spa)

    Server->>Server: Processes note data
    Server-->>Browser: HTTP 201 Created

    Note over Browser: No page reload, Browser updates UI with new note
:::