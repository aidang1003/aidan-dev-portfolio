import functools
from flask import Blueprint, Flask, render_template, url_for, session, request
from werkzeug.security import check_password_hash, generate_password_hash

projects_bp = Blueprint("projects", __name__)

@projects_bp.route('/projects', methods=["GET","POST"])
def projects():
    return render_template('projects.html', session=session)


@projects_bp.route('/qrcode', methods=["GET","POST"])
def qrcode():
    return render_template('qrcode.html', session=session)


@projects_bp.route('/ethRaffle', methods=["GET","POST"])
def ethRaffle():
    return render_template('ethRaffle.html', session=session)
