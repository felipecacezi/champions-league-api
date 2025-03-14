import { List } from "./List";
import { updatePlayer } from "../../DAO/players/updatePlayer";

export class Update {
    private playerId: number;
    private objPlayer: any;
    constructor(playerId: any, objPlayer: any) {        
        this.playerId = playerId;
        this.objPlayer = objPlayer;
    }

    async validation(){
        const list = new List();        
        await list.filterPlayer('key', this.playerId.toString());
        const players = await list.execute(false);
        if (players.length == 0) {
            throw { status: 404, success: false, message: "Jogador não encontrado." };
        }
        return true;
    }

    async execute(){
        const validation = await this.validation();        
        if (validation) {
            return updatePlayer(this.playerId, this.objPlayer);
        }  
    }
} 