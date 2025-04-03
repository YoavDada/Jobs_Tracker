from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import JobApplication, db
from collections import OrderedDict
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/add-job', methods=['POST'])
def add_job():
    data = request.get_json()

    try:
        new_job = JobApplication(
        company=data['company'],
        position=data['position'],
        in_progress=data.get('status', True),
        applied_date=datetime.strptime(data['applied_date'], '%Y-%m-%d').date(),
        job_post_link=data.get('job_post_link') 
        )
        db.session.add(new_job)
        db.session.commit()
        return jsonify({'message': 'Job added successfully'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/jobs', methods=['GET'])
def get_jobs():
    try:
        jobs = JobApplication.query.order_by(JobApplication.applied_date.desc()).all()
        job_list = []

        for job in jobs:
            job_list.append(OrderedDict([
                ('id', job.id),
                ('company', job.company),
                ('position', job.position),
                ('in_progress', job.in_progress),
                ('applied_date', job.applied_date.strftime('%Y-%m-%d')),
                ('job_post_link', job.job_post_link)
            ]))

        return jsonify(job_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = JobApplication.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job not found'}), 404

    return jsonify({
        'id': job.id,
        'company': job.company,
        'position': job.position,
        'in_progress': job.in_progress,
        'applied_date': job.applied_date.strftime('%Y-%m-%d'),
        'job_post_link': job.job_post_link
    }), 200

    
@app.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    try:
        job = JobApplication.query.get(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404

        db.session.delete(job)
        db.session.commit()
        return jsonify({'message': f'Job with id {job_id} deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    data = request.get_json()
    try:
        job = JobApplication.query.get(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404

        job.company = data.get('company', job.company)
        job.position = data.get('position', job.position)
        job.in_progress = data.get('in_progress', job.in_progress)
        job.job_post_link = data.get('job_post_link', job.job_post_link) 
        
        if 'applied_date' in data:
            job.applied_date = datetime.strptime(data['applied_date'], '%Y-%m-%d').date()

        db.session.commit()
        return jsonify({'message': f'Job with id {job_id} updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
