---
layout: single
title: "Semester Project Webserver"
permalink: /network-practice/webserver
toc: true
breadcrumbs: true
sidebar:
  - title: "Practical Topics"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-practice
taxonomy: markup
---


# Setup
This setup process will install the web app locally on your computer using a docker container.
- Install **Docker Desktop** ([Windows](https://docs.docker.com/desktop/setup/install/windows-install/), [Mac](https://docs.docker.com/desktop/setup/install/mac-install/), [Linux](https://docs.docker.com/desktop/setup/install/linux/)).<br/>
  ![Docker Download Page]({{ site.baseurl }}/assets/images/docker_download.png)
- Clone the github repository of the [Web App](https://github.com/LauEls/ele201_semester_project_web_app). You can also download it as a zip file and unpack it.<br/>
  ![Docker Download Page]({{ site.baseurl }}/assets/images/github_repo_download.png)
- Open a terminal window (on Windows this is called **Command Prompt**)
- Navigate to the Web App using the `cd PATH` command. **Note:** `PATH` has to be replaced with an actual path, e.g. `cd C:\Users\laure\Desktop\ele201_semester_project_web_app-main`.
- Run `docker compose up --build` to build the docker container. Once it is finished the end of the output should look something like this:<br/>
  ![Docker Build Result]({{ site.baseurl }}/assets/images/terminal_build_result.png)
- Close the terminal window
- Open Docker Desktop. Navigate on the left side to the **Containers** tab. You should have a container called **ele201_semester_project_web_app**. Press the play button to start the container.<br/>
  ![Docker Start Container]({{ site.baseurl }}/assets/images/docker_containers.png)
- The Web App should be reachable through you web browser under `http://localhost:3000/`.<br/>
  ![Web App Home Page]({{ site.baseurl }}/assets/images/webapp_home.png)

# Webapp Walkthrough

## Register Device
Before you send any data to the web server make sure you register you device:
- Startup the container through **Docker Desktop**.
- In a web browser open the web app which can be reached under `http://localhost:3000/`.
- Navigate to **Register Device** on the top of the home page.
- Enter the MAC address of your device and give it a name. The MAC address has to be in the format XX-XX-XX-XX-XX-XX, where X is a hexadecimal value. **Note:** It doesn't really matter which MAC address you enter here, just make sure you use the same value when sending data to the web server later on.

## Data Visualization
After registering a device you can navigate to the page of your semester project. In the dropdown menu **Device Name** you should be able to find your device. Select it. This page will visualize your data as soon as you send it through POST request from your microcontroller.

## API
To look at the api navigate to `http://localhost:8000/api/`. Here you can see the different project APIs available. You can see the **keys** and **value types** that your POST requests need to include by navigating to the api of your project, e.g. for the piano project navigate to `http://localhost:8000/api/piano/`.

## Sending Data to the Server
Here is an example code in python on how to send a POST request to the Web Server running on your computer from a raspberry pi. **Note:** The ip address `192.168.1.180` is the address of my computer on the NIC that is connected to the raspberry pi.
```python
import requests
import json

# Define the URL of the endpoint you want to send the POST request to
url = 'http://192.168.1.180:8000/api/piano/'

# Prepare the data you want to send (e.g., a dictionary that will be converted to JSON)
payload = {
    'mac_address': 'C0-25-A5-27-28-B0',
    'note': 'e'
}

# Set the headers, especially Content-Type if sending JSON
headers = {
    'Content-Type': 'application/json'
}

try:
    # Send the POST request
    response = requests.post(url, data=json.dumps(payload), headers=headers)

    # Check the response status code
    if response.status_code == 201:
        print("POST request successful!")
        print("Response:", response.json()) # Assuming the response is JSON
    else:
        print(f"POST request failed with status code: {response.status_code}")
        print("Response:", response.text) # Print the raw response if not JSON

except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
```

