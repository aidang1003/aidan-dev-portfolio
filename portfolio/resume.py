from flask import Blueprint, redirect

resume_bp = Blueprint("resume", __name__)

@resume_bp.route('/resume', methods=["GET","POST"])
def resume():
    return redirect('/#resume')