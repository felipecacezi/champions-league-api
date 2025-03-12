import { FastifyRequest, FastifyReply } from "fastify";
import { Create } from '../services/players/Create';
import { List } from '../services/players/List';

export class PlayersController {
    static async list(request: any, reply: any){
        try {
            const list = new List();
            const responseList = await list.execute();
            reply.status(201).send({ 
                success: true, 
                message: "", 
                data: responseList
            });  
        } catch (error: any) {
            reply.status(error.status).send({ 
                success: error.success, 
                message: error.message ?? "Ocorreu um erro desconhecido ao listar os jogadores.", 
                data: []
            });
        }
    }

    static async get(request: FastifyRequest<{ Params: { parameter: string; value: string } }>, reply: FastifyReply){
        try {
            const list = new List();
            await list.filterPlayer(request.params.parameter, request.params.value);
            const responseList = await list.execute(false);

            reply.status(201).send({ 
                success: true, 
                message: responseList.length > 0 ? "" : "Nenhum jogador encontrado.", 
                data: responseList
            });  
        } catch (error: any) {
            reply.status(error.status).send({ 
                success: error.success, 
                message: error.message ?? "Ocorreu um erro desconhecido ao listar os jogadores.", 
                data: []
            });
        }
    }

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