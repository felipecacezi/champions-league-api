import { Create } from '../services/players/Create';

export class PlayersController {
    static async list(){}
    static async get(){}
    static async create(request: any, reply: any){
        try {
            const create = new Create(request.body);  
            const responseCreate = await create.execute();    
            reply.status(201).send({ 
                success: true, 
                message: "Jogador criado com sucesso.", 
                data: responseCreate
            });      
        } catch (error: any) {                
            reply.status(error.status).send({ 
                success: error.success, 
                message: error.message ?? "Ocorreu um erro desconhecido ao criar um novo jogador.", 
                data: []
            });
        }        
    }
    static async update(){}
    static async delete(){}
}