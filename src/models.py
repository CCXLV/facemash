import base64
import random

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, template_folder='./templates', static_folder='./static')
app.config['SECRET_KEY'] = 'LlmYzFasFvdmjsdDFasfgAFTASF7AgfSFagAGkdff7giAVx27rx6AeMcCbd'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost:3306/db'

db = SQLAlchemy(app)

class Images(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.String(128), nullable=True)
    data = db.Column(db.LargeBinary(), nullable=True)
    name = db.Column(db.String(128), nullable=True)
    rating = db.Column(db.BigInteger, nullable=True)


def filter_all_images():
    _data = db.session.query(Images).all()

    data = []
    for i in _data:
        dict = {
            'unique_id': i.unique_id,
            'data': i.data,
            'name': i.name,
            'rating': i.rating
        }
        data.append(dict)
    
    for i in data:
        i['data'] = base64.b64encode(i['data']).decode('utf-8')

    return data


def filter_rating_needs():
    _data = db.session.query(Images).all()

    data = []
    for i in _data:
        dict = {
            'unique_id': i.unique_id,
            'rating': i.rating,
        }
        data.append(dict)

    return data


def image_uid_filter(index):
    _data = db.session.query(Images).all()

    data = []
    for i in _data:
        dict = {
            'unique_id': i.unique_id,
        }
        data.append(dict)
    r = []
    r.append(data[index]['unique_id'])

    return r


def db_update_rating(uid, new_rating):
    result = Images.query.filter_by(unique_id=uid).first()

    result.rating = new_rating
    db.session.commit()


with app.app_context():
    image_ratings = filter_rating_needs()


winner_points = [
    9, 10, 11
]

loser_points = [
    5, 6, 7, 8
]

def update_ratings(winner_index, loser_index):
    winner = image_ratings[winner_index]
    loser = image_ratings[loser_index]

    winner['rating'] = winner['rating'] + random.choice(winner_points)
    loser['rating'] = winner['rating'] - random.choice(loser_points)

