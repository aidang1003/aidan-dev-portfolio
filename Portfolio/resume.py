import functools
from flask import Blueprint, Flask, render_template, url_for, session, request
from werkzeug.security import check_password_hash, generate_password_hash

resume_bp = Blueprint("resume", __name__)

@resume_bp.route('/resume', methods=["GET","POST"])
def resume():
    return render_template('resume.html', session=session)