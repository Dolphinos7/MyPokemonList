from flask import Flask, request, jsonify, make_response, Blueprint, Response
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

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(50))
    pokemonType = db.Column(db.String(50))
    pokemon_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_id = db.Column(db.Integer) #This will be the foreign key, implement later

    def __init__(self, pokemonType, name, pokemon_id, user_id):
        self.name = name
        self.pokemonType = pokemonType
        self.pokemon_id = pokemon_id
        self.user_id = user_id
        


#Product Scheme
class UserSchema(ma.Schema):
    class Meta:
        fields = ('public_id', 'name', 'password', 'admin')

#initialize schema (in his had strict=True as param, was erroring for me)
user_schema = UserSchema()
#fetching multiple products
users_schema = UserSchema(many=True)


class PokemonSchema(ma.Schema):
    class Meta:
        fields = ('name', 'pokemonType', 'pokemon_id')

#initialize schema (in his had strict=True as param, was erroring for me)
pokemon_schema = PokemonSchema()
#fetching multiple products
pokemons_schema = PokemonSchema(many=True)


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

#Anyone can create a user with no login token
@app.route('/user', methods=['POST'])
def create_user():
    # if not current_user.admin:
    #     return jsonify({'message' : 'cannot perform that function'})
    # print('request below')
    # print(request.json)
    name = request.json['name']
    password = request.json['password']
    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(str(uuid.uuid4()), name, hashed_password, False)
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

@app.route('/pokemon', methods=['POST'])
@token_required
def create_pokemon(current_user):
    pokemonType = request.json['pokemonType']
    name = request.json['name']
    pokemon_id = request.json['pokemon_id']
    user_id=current_user.id

    new_pokemon = Pokemon(pokemonType, name, pokemon_id, user_id)

    db.session.add(new_pokemon)
    db.session.commit()
    return pokemon_schema.jsonify(new_pokemon)

@app.route('/pokemon', methods=['GET'])
@token_required
def get_all_pokemon(current_user):
    allPokemon = Pokemon.query.filter_by(user_id=current_user.id).all()
    result = pokemons_schema.dump(allPokemon)
    return jsonify(result)

@app.route('/allpokemon', methods=['GET'])
def get_all_free_pokemon():
    allPokemon = Pokemon.query.all()
    result = pokemons_schema.dump(allPokemon)
    return jsonify(result)

@app.route('/pokemon/<pokemon_id>', methods=['GET'])
@token_required
def get_one_pokemon(current_user, pokemon_id):
    pokemon = Pokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).first()
    if not pokemon:
        return jsonify({'message': 'No Pokemon Found'})
    return pokemon_schema.jsonify(pokemon)

# #PUT Request if i need it at some point

@app.route('/pokemon/<pokemon_id>', methods=['DELETE'])
@token_required
def delete_one_pokemon(current_user, pokemon_id):
    pokemon = Pokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).first()
    if not pokemon:
        return jsonify({'message': 'No Pokemon Found'})
    db.session.delete(pokemon)
    db.session.commit()
    return pokemon_schema.jsonify(pokemon)







if __name__ == '__main__':
    app.run(debug=True)
