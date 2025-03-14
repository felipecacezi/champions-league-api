import { getAllPlayers } from "../../DAO/players/getAllPlayers";
import { Player } from "../../interfaces/player";
import { getPlayerByKey } from "../../DAO/players/getPlayerByKey";

export class List {
    private data: any;
    constructor(){}

    private async filterByName(arPlayers: any[], value: string){
        return await arPlayers.filter((player: Player) => { 
            const originalWord = `${player.first_name.toLowerCase()}`;
            return originalWord.includes(value.toLowerCase());
        });
    }

    private async filterByPosition(arPlayers: any[], value: string){
        return await arPlayers.filter((player: Player) => { 
            const originalWord = `${player.position.toLowerCase()}`;
            return originalWord.includes(value.toLowerCase());
        });
    }

    private async filterByTeam(arPlayers: any[], value: string){
        return await arPlayers.filter((player: Player) => { 
            const originalWord = `${player.team.toLowerCase()}`;
            return originalWord.includes(value.toLowerCase());
        });
    }

    private async filterByKey(value: string){        
        return await getPlayerByKey(value);
    }

    async execute(all: boolean = true) {
        if (all) {
            return getAllPlayers();
        }
        return this.data;
    }

    async filterPlayer(parameter: string, value: string) {
        try {            
            if (parameter == 'key') {
                this.data = await this.filterByKey(value);
                return true;
            }

            const players = await getAllPlayers();          
            const arPlayers = Object.values(players);
            
            if (parameter == 'first_name') {
                this.data = await this.filterByName(arPlayers, value);
            }

            if (parameter == 'position') {
                this.data = await this.filterByPosition(arPlayers, value);
            }

            if (parameter == 'team') {
                this.data = await this.filterByTeam(arPlayers, value);
            }
        } catch (error) {
            throw {
                status: 500,
                success: false,
                message: "Ocorreu um erro desconhecido ao filtrar os jogadores."
            }
        }
}
}