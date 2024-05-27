# Guitar for the Church Life
## Initial Development Setup
After the initial clone from git, to install requirements for backend and frontend, cd into
frontend and backend and in each run 'make install'

## Backend/Frontend Setup
Currently, so that the website can be hosted from a single Heroku dyno, the backend returns
JSON responses at some endpoints and static HTML files from the frontend at other endpoints.

### Backend Development
- To launch the backend server, cd into backend, run **source env/bin/activate** to start the 
  virtual environment, and run **make startdev**. This should launch the backend in browser. 
  Updates to files should be live.

### Frontend Development
- Because the backend serves static HTML files from the frontend, you can view the frontend by
  launching the backend. However, for development it is nice for the site to update live as files
  are changed. For this, the frontend server must be launched on one port simultaneously with the
  backend server on another port. If developing the frontend, launch the backend then the frontend:
- To launch the frontend server, cd into frontend, change PORT in the "startdev" script in the 
  frontend/package.json file to be the backend port, and run **make startdev**. This should launch 
  the frontend in browser. Updates to files should be live (although slightly delayed), because
  of the WATCHPACK_POLLING=true setting in the frontend/package.json "startdev" script.
