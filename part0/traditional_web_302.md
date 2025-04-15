sequenceDiagram
    participant User
    participant Browser
    participant Server

    User ->> Browser: give input and click submission
    Note over Browser: Form data prepared

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Server->>Server: Create new note object
    Note right of Browser: HTTP POST request to /new_note
    Server-->>Browser: 302 URL redirect
    Note right of Browser: The server responds with HTTP 302 redirecting to /notes
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: the css file
    deactivate Server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: the JavaScript file
    deactivate Server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: the raw data
    deactivate Server
