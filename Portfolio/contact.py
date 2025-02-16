import functools
from flask import Blueprint, Flask, render_template, url_for, session, request
from werkzeug.security import check_password_hash, generate_password_hash

contact_bp = Blueprint("contact", __name__)

@contact_bp.route('/contact', methods=["GET","POST"])
def contact():
    return render_template('contact.html', session=session)