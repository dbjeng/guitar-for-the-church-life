# Guitar for the Church Life
## Development Instructions
*To do any frontend development, you will have to open 2 terminals and launch the backend
and then the frontend.

### Backend Development
- To launch the backend server, cd into backend, run **source env/bin/activate** to start the 
  virtual environment, and run **make startdev**. This should launch the backend in browser. 
  Updates to files should be live.

### Frontend Development
- To launch the frontend server, cd into frontend, change PORT in the "startdev" script in the 
  frontend/package.json file to be the backend port, and run **make startdev**. This should launch 
  the frontend in browser. Updates to files should be live (although slightly delayed), because
  of the WATCHPACK_POLLING=true setting in the frontend/package.json "startdev" script.
