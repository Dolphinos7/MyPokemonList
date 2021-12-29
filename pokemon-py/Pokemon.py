# The blueprint for my pokemon api endpoint
#
# from flask import Blueprint, request, jsonify
# import os
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
# from api import token_required

# pokemon_api = Blueprint('pokemon_api', __name__)

# db = SQLAlchemy()

# ma = Marshmallow()

# class Pokemon(db.Model):
#     id = db.Column(db.Integer, primary_key=True) 
#     name = db.Column(db.String(50))
#     pokemonType = db.Column(db.String(50))
#     pokemon_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     user_id = db.Column(db.Integer) #This will be the foreign key, implement later

#     def __init__(self, pokemonType, name, pokemon_id, user_id):
#         self.name = name
#         self.pokemonType = pokemonType
#         self.pokemon_id = pokemon_id
#         self.user_id = user_id
        


# class PokemonSchema(ma.Schema):
#     class Meta:
#         fields = ('name', 'pokemonType', 'pokemon_id')

# #initialize schema (in his had strict=True as param, was erroring for me)
# pokemon_schema = PokemonSchema()
# #fetching multiple products
# pokemons_schema = PokemonSchema(many=True)

# @pokemon_api.route('/pokemon', methods=['POST'])
# @token_required
# def create_pokemon(current_user):
#     pokemonType = request.json['pokemonType']
#     name = request.json['name']
#     pokemon_id = request.json['pokemon_id']
#     user_id=current_user.id

#     new_pokemon = Pokemon(pokemonType, name, pokemon_id, user_id)

#     db.session.add(new_pokemon)
#     db.session.commit()
#     return pokemon_schema.jsonify(new_pokemon)

# @pokemon_api.route('/pokemon', methods=['GET'])
# @token_required
# def get_all_pokemon(current_user):
#     allPokemon = Pokemon.query.filter_by(user_id=current_user.id).all()
#     result = pokemons_schema.dump(allPokemon)
#     return jsonify(result)

# @pokemon_api.route('/pokemon/<pokemon_id>', methods=['GET'])
# @token_required
# def get_one_pokemon(current_user, pokemon_id):
#     pokemon = Pokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).first()
#     if not pokemon:
#         return jsonify({'message': 'No User Found'})
#     return pokemon_schema.jsonify(pokemon)

# #PUT Request if i need it at some point

