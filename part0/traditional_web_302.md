sequenceDiagram
    participant User
    participant Browser
    participant Server

    User ->> Browser: Provide input and click submit
    Note over Browser: Form data prepared

    Browser ->> Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Note right of Server: Server processes the submitted form data
    Server ->> Server: Create new note object
    Server -->> Browser: 302 Redirect to /notes
    deactivate Server

    Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server -->> Browser: HTML document (updated Notes page)
    deactivate Server

    Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server -->> Browser: CSS file
    deactivate Server

    Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server -->> Browser: JavaScript file
    deactivate Server

    Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server -->> Browser: JSON notes data
    deactivate Server