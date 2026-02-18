from flask import Flask, session, render_template, request, redirect, url_for
from dotenv import load_dotenv
import os


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    load_dotenv(override=True) # load data from the .env file
    app.config.from_mapping(
        SECRET_KEY=os.getenv('FLASK_SECRET_KEY'), # set the secret key
        DATABASE=os.path.join(app.instance_path, 'portfolio.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
        
    @app.route('/')
    def index():
        return render_template('index.html', pageTitle='Homepage', session=session)
    
    @app.route('/favicon.ico')
    def favicon():
        return url_for('static', filename='images/favicon.ico')

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.auth_bp)

    from . import about
    app.register_blueprint(about.about_bp)

    from . import resume
    app.register_blueprint(resume.resume_bp)
    
    from . import projects
    app.register_blueprint(projects.projects_bp)

    from . import contact
    app.register_blueprint(contact.contact_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()