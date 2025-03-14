import { List } from "./List";

export class Update {
    private playerId: number;
    private objPlayer: any;
    constructor(playerId: any, objPlayer: any) {
        this.playerId = playerId;
        this.objPlayer = objPlayer;
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
            
        }        
    }
} 