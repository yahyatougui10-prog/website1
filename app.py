from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import uvicorn
import random

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")
templates = Jinja2Templates(directory=".")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/execute")
async def execute_command(cmd: str):
    # High-fidelity simulation of a Docker Engine
    responses = {
        "docker version": "Client: Docker Engine - Community 24.0.5\nOS/Arch: linux/amd64\nContext: default",
        "docker ps": "CONTAINER ID   IMAGE         COMMAND     STATUS          PORTS     NAMES\n7a1b2c3d4e5f   nginx:alpine   \"docker-entrypoint...\" Up 2 minutes   80/tcp    web-server",
        "docker images": "REPOSITORY   TAG       IMAGE ID       CREATED       SIZE\nnginx         alpine    f3b1c2d3e4f5   2 weeks ago   141MB\npostgres      15-alpine  a1b2c3d4e5f6   3 weeks ago   350MB",
        "docker run hello-world": "Hello from Docker! This is a test container running successfully. ✓",
        "docker network ls": "NETWORK ID     NAME        DRIVER     SCOPE\n2f3a4b5c6d7e   bridge      bridge      local\n8g9h0i1j2k3l   app-network   bridge      local",
        "docker volume ls": "DRIVER VOLUME NAME\nlocal   pg_data\nlocal   redis_cache"
    }
    
    if "docker run" in cmd:
        return f"Pulling image... \nCreating container... \nStarted container {random.getrandbits(48):x} successfully! ✓"
    
    return responses.get(cmd, f"Command '{cmd}' executed. Output: Success (Simulated)")

@app.get("/api/suggest")
async def suggest_command(query: str):
    suggestions = ["docker ps", "docker images", "docker run hello-world", "docker network ls", "docker volume ls"]
    matches = [s for s in suggestions if query.lower() in s.lower()]
    return {"suggestions": matches[:3]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
