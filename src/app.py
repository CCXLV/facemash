import base64
import uuid

from flask import render_template, send_from_directory, request, jsonify

from models import (
    app, db, Images, filter_all_images, 
    update_ratings, image_ratings,
    image_uid_filter, db_update_rating,
    filter_rating_needs
)

with app.app_context():
    image_ratings = filter_rating_needs()

@app.after_request
def add_cache_control_headers(response):
    response.headers['Cache-Control'] = 'no-store'
    return response

@app.route('/static/bundle/<path:filename>')
def serve_static(filename):
    return send_from_directory('static/bundle', filename)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rankings')
def home():
    return render_template('rankings.html')

@app.route('/update_rating', methods=['POST'])
def update_rating():
    data = request.get_json()
    
    update_ratings(data['rating']['winner'], data['rating']['loser'])

    w_unique_id = image_uid_filter(data['rating']['winner'])
    l_unique_id = image_uid_filter(data['rating']['loser'])

    db_update_rating(w_unique_id, image_ratings[data['rating']['winner']]['rating'])
    db_update_rating(l_unique_id, image_ratings[data['rating']['loser']]['rating'])



    return 'Rating update successfully'

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    return render_template('submit.html')

@app.route('/image_submit', methods=['POST'])
def image_submit():
    data = request.get_json()
    unique_id = str(uuid.uuid4())[:13]
    image_data = base64.b64decode(data['data']['image']['data'].split(',')[1])

    new_data = Images(unique_id=unique_id, data=image_data, name=data['data']['name'], rating=1400)
    db.session.add(new_data)
    db.session.commit()


    return 'Image Submited Successfully'

@app.route('/api/data/images', methods=['GET'])
def api_images():
    data = filter_all_images()
    
    return jsonify(data)

if __name__ == '__main__':
    app.run()
