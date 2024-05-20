start:
	gunicorn --bind localhost:$(PORT) files.wsgi:application

startdev:
	python manage.py runserver

format:
	black .

# Command to start virtual environment
# source env/bin/activate