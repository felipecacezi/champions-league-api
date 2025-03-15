import { getAllClubs } from "../../DAO/clubs/listAllClubs";
import { Club } from "../../DTO/club";
import { getClubByKey } from "../../DAO/clubs/getClubByKey";

export class List {
    private data: Club[] | null = null;
    constructor(){}

    private async filterByName(arClubs: any[], value: string){
        return await arClubs.filter((club: Club) => { 
            const originalWord = `${club.name.toLowerCase()}`;
            return originalWord.includes(value.toLowerCase());
        });
    }

    private async filterBySlug(arClub: any[], value: string){
        return await arClub.filter((club: Club) => { 
            const originalWord = `${club.slug.toLowerCase()}`;
            return originalWord.includes(value.toLowerCase());
        });
    }

    private async filterByKey(value: string){        
        return await getClubByKey(value);
    }

    async execute(all: boolean = true) {
        if (all) {
            return getAllClubs();
        }
        return await this.data;
    }

    async filterClub(parameter: string, value: string) {
        try {                  
            if (parameter == 'key') {
                this.data = await this.filterByKey(value);
                return true;
            }

            const clubs = await getAllClubs();          
            const arClubs = Object.values(clubs);
            
            if (parameter == 'name') {
                this.data = await this.filterByName(arClubs, value);
            }

            if (parameter == 'slug') {
                this.data = await this.filterBySlug(arClubs, value);
            }
        } catch (error) {
            throw {
                status: 500,
                success: false,
                message: "Ocorreu um erro desconhecido ao filtrar os clubes."
            }
        }
    }
}