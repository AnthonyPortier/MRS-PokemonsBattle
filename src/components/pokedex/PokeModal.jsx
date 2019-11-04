import React from 'react'
import axios from 'axios'
import './PokeModal.css'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'



const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon'


class PokeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: {
                types: [],
                moves: [],
                stats: []
            },
            modal : this.props.stateModal
        }
    }



    UNSAFE_componentWillReceiveProps() {
        axios.get(`${pokemonUrl}/${this.props.keyModal + 1}`)
            .then(response => {
                this.setState({ pokemon: response.data })
            })
            .catch(err => console.log(err))
    }

    

    render() {

        const randomMove = (Math.random() * ((this.state.pokemon.moves.length) - 1) + 1)


        return (

            <div>
                <Modal isOpen={this.props.stateModal} toggle={this.props.changeStateModal} className="pokeModal">
                    <ModalHeader>
                        <p>{this.props.namePokemon}</p>
                        <img className="pokeImg" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.keyModal + 1}.png`} alt="front sprite on card" />
                        <img className="pokeImg" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.props.keyModal + 1}.png`} alt="front sprite on card" />
                    </ModalHeader>
                    <ModalBody>
                        <p>Type :{`${this.state.pokemon.types.map(x => x.type.name)} `}</p>
                        <p>Height : {this.state.pokemon.height}</p>
                        <p>Weight : {this.state.pokemon.weight}</p>
                        {this.state.pokemon.stats.map(x =>
                            <p>{x.stat.name} {x.base_stat}</p>)
                        }
                        <p>Moves : {`${this.state.pokemon.moves.slice(randomMove, (randomMove + 4)).map(x => x.move.name)}`} </p>
                    </ModalBody>
                    <Button color="secondary" onClick={this.props.changeStateModal}>Cancel</Button>
                </Modal>
            </div >



        );
    }
}


export default PokeModal;