# Only for deployment, use make startdev for development
start:
	gunicorn files.wsgi

# Collects all the frontend files from the most recent build and
# returns them for certain endpoints
static:
	yes yes | python manage.py collectstatic --no-input

startdev:
	DEV="true" python manage.py runserver

format:
	black .

install:
	pip install -r requirements.txt

# Command to start virtual environment:
# source env/bin/activate

# To stop virtual environment:
# deactivate
