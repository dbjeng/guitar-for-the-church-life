start:
	gunicorn --bind 0.0.0.0:$(PORT) files.wsgi:application

startdev:
	python manage.py runserver

format:
	black .

# Command to start virtual environment
# source env/bin/activate