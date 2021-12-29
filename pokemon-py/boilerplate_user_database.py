from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import uuid
from sqlalchemy.sql.elements import Null
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt
import datetime
from functools import wraps
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SECRET_KEY'] = 'wsexzrtfxcvtfugyihbvuyhnboijknmk31235634aseadwsfsda'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(50))
    admin = db.Column(db.Boolean)

    def __init__(self, public_id, name, password, admin):
        self.public_id = public_id
        self.name = name
        self.password = password
        self.admin = admin

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    text = db.Column(db.String(50))
    complete = db.Column(db.Boolean)
    public_id = db.Column(db.Integer) #This will be the foreign key, implement later

#Product Scheme
class UserSchema(ma.Schema):
    class Meta:
        fields = ('public_id', 'name', 'password', 'admin')

#initialize schema (in his had strict=True as param, was erroring for me)
user_schema = UserSchema()
#fetching multiple products
users_schema = UserSchema(many=True)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'token is missing'}, 401)

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'token is invalid'}, 401)

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    if not current_user.admin:
        return jsonify({'message' : 'cannot perform that function'})

    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

@app.route('/user/<user_id>', methods=['GET'])
@token_required
def get_one_user(current_user, user_id):
    if not current_user.admin:
        return jsonify({'message' : 'cannot perform that function'})

    user = User.query.filter_by(public_id=user_id).first()
    if not user:
        return jsonify({'message': 'No User Found'})
    return user_schema.jsonify(user)

@app.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
    if not current_user.admin:
        return jsonify({'message' : 'cannot perform that function'})

    
    name = request.json['name']
    password = request.json['password']
    print(password)
    hashed_password = generate_password_hash(password, method='sha256')
    print(hashed_password)
    new_user = User(str(uuid.uuid4()), name, hashed_password, False)
    print (new_user.name)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'new user created!'})

@app.route('/user/<user_id>', methods=['PUT'])
@token_required
def promote_user(current_user, user_id):
    if not current_user.admin:
        return jsonify({'message' : 'cannot perform that function'})

    user = User.query.filter_by(public_id=user_id).first()
    if not user:
        return jsonify({'message': 'No User Found'})
    user.admin = True
    db.session.commit()
    return jsonify({'message':'User Promoted!'})

@app.route('/user/<user_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, user_id):
    if not current_user.admin:
        return jsonify({'message' : 'cannot perform that function'})

    user = User.query.filter_by(public_id=user_id).first()
    if not user:
        return jsonify({'message': 'No User Found'})
    db.session.delete(user)
    db.session.commit()


    return jsonify({'message':'User Deleted!'})

@app.route('/login', methods=['GET'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, app.config['SECRET_KEY'])
        return jsonify({'token' : token})
    
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

if __name__ == '__main__':
    app.run(debug=True)
