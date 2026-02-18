from flask import Blueprint, redirect

about_bp = Blueprint("about", __name__)

@about_bp.route('/about', methods=["GET","POST"])
def about():
    return redirect('/#about')