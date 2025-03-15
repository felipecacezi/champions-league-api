import { Club } from "../../DTO/club";
import { getAllClubs } from '../../DAO/clubs/listAllClubs'
import { newClub } from '../../DAO/clubs/newClub'

export class Create {
    private data: Club;
    constructor(data: Club) {
        this.data = data;
    }

    async validateAlreadyExists() {
        try {            
            const clubs: Club[] = await getAllClubs();   
            let matchingClubs: Club[] = [];
            if (clubs) {
                const arClubs = Object.values(clubs);
                matchingClubs = arClubs.filter((club) => {    
                    return club.name === this.data.name 
                    && club.slug === this.data.slug
                });
            }

            return matchingClubs ?? {};
        } catch (error) {
            throw {
                status: 500,
                success: false,
                message: "Ocorreu um erro desconhecido ao cadastrar um novo clube."
            }
        }
    }

    async execute() {
        const exists = await this.validateAlreadyExists();        
        
        if (exists.length > 0) {
            throw {
                status: 400,
                success: false,
                message: "Clube já cadastrado."
            }
        }

        const created = await newClub(this.data);

        return {
            uuid: created,
            ...this.data
        }
    }
}