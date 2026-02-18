from flask import Blueprint, redirect

contact_bp = Blueprint("contact", __name__)

@contact_bp.route('/contact', methods=["GET","POST"])
def contact():
    return redirect('/#contact')