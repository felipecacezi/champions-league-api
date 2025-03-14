import { PlayerPost } from "../../interfaces/playerPost";
import { getAllPlayers } from "../../DAO/players/getAllPlayers";
import { newPlayer } from "../../DAO/players/newPlayer";

export class Create {
    private data: PlayerPost;
    constructor(data: PlayerPost) {
        this.data = data;
    }

    async validateAlreadyExists() {
        try {            
            const players: PlayerPost[] = await getAllPlayers();   
            let matchingPlayers: PlayerPost[] = [];
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
            console.log(error);
            return
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