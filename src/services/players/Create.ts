import { Player } from "../../DTO/player";
import { getAllPlayers } from "../../DAO/players/getAllPlayers";
import { newPlayer } from "../../DAO/players/newPlayer";

export class Create {
    private data: Player;
    constructor(data: Player) {
        this.data = data;
    }

    async validateAlreadyExists() {
        try {            
            const players: Player[] = await getAllPlayers();   
            let matchingPlayers: Player[] = [];
            if (players) {
                const arPlayers = Object.values(players);
                matchingPlayers = arPlayers.filter((player) => {    
                    return player.age === this.data.age 
                    && player.first_name === this.data.first_name 
                    && player.last_name === this.data.last_name 
                    && player.position === this.data.position 
                    && player.team === this.data.team
                });
            }

            return matchingPlayers ?? {};
        } catch (error) {
            throw {
                status: 500,
                success: false,
                message: "Ocorreu um erro desconhecido ao cadastrar um novo jogador."
            }
        }
    }

    async execute() {
        const exists = await this.validateAlreadyExists();        
        
        if (exists.length > 0) {
            throw {
                status: 400,
                success: false,
                message: "Jogador já cadastrado."
            }
        }

        const created = await newPlayer(this.data);

        return {
            uuid: created,
            ...this.data
        }
    }
}