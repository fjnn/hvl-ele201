---
layout: single
title: "Projects"
permalink: /projects/
toc: true
breadcrumbs: true
sidebar:
  - title: "Projects"
    image: /assets/images/logo.png
    image_alt: "image"
    text: "You can find cool projects here."
taxonomy: markup
---

- [Project 1 - ](/custom404)
- [Project 2 - ](/custom404)

# Set a simple web server using Python for test purposes
Check this out for more detailed info: [digitalocean.com](https://www.digitalocean.com/community/tutorials/python-simplehttpserver-http-server)

Create a new Python file called `simple_server.py`
```Python
from http.server import BaseHTTPRequestHandler, HTTPServer
import time

HOST_NAME = 'localhost' # Use '0.0.0.0' to listen on all interfaces
PORT_NUMBER = 8080      # Choose a port number

class SimpleDataHandler(BaseHTTPRequestHandler):
    """A custom handler for HTTP requests."""

    def do_GET(self):
        """Handle GET requests from the client (STM32)."""
        if self.path == '/data':
            # --- Data to send to STM32 ---
            # This is the data your STM32 will receive. 
            # You can change this dynamically, e.g., read from a file, database, or a user input.
            data_payload = "123.45, 67.89, 0.5" # Example data: comma-separated values

            self.send_response(200) # HTTP 200 OK
            self.send_header('Content-type', 'text/plain') # Plain text data
            self.end_headers()
            
            # Write the data payload to the response body
            self.wfile.write(bytes(data_payload, "utf-8"))
            print(f"Sent data: {data_payload}")

        else:
            self.send_response(404) # HTTP 404 Not Found
            self.end_headers()
            self.wfile.write(bytes("404 Not Found", "utf-8"))
            print(f"Request for unknown path: {self.path}")


if __name__ == '__main__':
    server_class = HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), SimpleDataHandler)
    print(time.asctime(), f"Server Starts - {HOST_NAME}:{PORT_NUMBER}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    
    httpd.server_close()
    print(time.asctime(), "Server Stops - Shut down by user")
```