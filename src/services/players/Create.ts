import { PlayerPost } from "../../interfaces/playerPost";
import { getAllPlayers } from "../../DAO/players/getAllPlayers";

export class Create {
    private data: PlayerPost;
    constructor(data: PlayerPost) {
        this.data = data;
    }

    async validateAlreadyExists() {
        try {
            const players = await getAllPlayers();
            return players;
        } catch (error) {
            throw {
                status: 500,
                success: false,
                message: "Ocorreu um erro desconhecido ao cadastrar um novo jogador."
            }
        }
    }

    async execute() {
        console.log(this.data);
        
        return {};
    }
}