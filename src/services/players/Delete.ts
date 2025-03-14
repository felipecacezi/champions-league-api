import { List } from "./List";
import { deletePlayer } from "../../DAO/players/deletePlayer";

export class Delete {
    private playerId: number;
    private objPlayer: any;
    constructor(private playerId: number) {
        this.playerId = playerId;
    }

    async validation(){
        const list = new List();
        list.filterPlayer('key', this.playerId.toString());
        const players = await list.execute();        
        if (players.length == 0) {
            throw { status: 404, success: false, message: "Jogador não encontrado." };
        }
        this.objPlayer = players;
        return true;
    }

    async execute(){
        const validation = await this.validation();
        if (validation) {
            return deletePlayer(this.playerId);
        }
    }
}