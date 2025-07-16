# Financial Formulas

---

## Basic structure for starting a Flask project with Jinja templates

1. Clone this repository to local computer

2. Create a new virtual environment

   - Windows: `py -m venv ./venv`
   - Mac: `python -m venv ./venv`

3. Activate the new virtual environment

   - Windows: `.\venv\Scripts\activate`
   - Mac: `source ./venv/bin/activate`

4. Install the dependencies `pip install -r requirements.txt`

5. Create the dotenv file `echo FLASK_SECRET_KEY = sessionkey1559 > .env`

6. Initialize the db `flask --app portfolio init-db`

7. Start the app `flask --app portfolio run --debug`

---

## Manage Git in the command line

1. Make a new repository by running `git init` in the folder.

2. Track all the files in the new local repository `git add .`

3. Make the first commit of this new project `git commit -m 'first commit of <project name> from flask_template`

4. On Github, create a new repository. _DO NOT_ initialize it

5. Connect the local repository to the new Github repository `git remote add origin <<repository_URL>>`

6. Create and change to a new local development branch `git checkout b <<branch_name>>`

---

## Manage Dependencies

Install the dependencies `pip install -r requirements.txt`

List dependencies: `pip list`

Add dependencies to the requirements.txt: `pip freeze > requirements.txt`

---

## Usefule Testing Commands

1. `pytest` to initiate the test
2. `coverage run -m pytest` measures the coverage of the tests
3. `coverage report` returns the coverage report to the command line
4. `coverage html` return to an HTML instead

---

## Deploy To a Server

https://flask.palletsprojects.com/en/stable/tutorial/deploy/

1. `pip install build`

2. `py -m build --wheel`

3. Copy the wheel file to a different machine 

4. (Optional) Create a virtual environment

5. Run `pip install portfolio-1.0.3-py2.py3-none-any.whl`

6. Re-initialize the db `flask --app portfolio init-db`

7. Add the secret key to a new config.py file located at `echo FLASK_SECRET_KEY = [generate production key] > \venv\var\portfolio-instance\.env`

8. `pip install waitress`

9. `waitress-serve --call portfolio:create_app`
