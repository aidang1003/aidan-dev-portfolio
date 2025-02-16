import functools
from flask import Blueprint, Flask, render_template, url_for, session, request
from werkzeug.security import check_password_hash, generate_password_hash

about_bp = Blueprint("about", __name__)

@about_bp.route('/about', methods=["GET","POST"])
def about():
    return render_template('about.html', session=session)