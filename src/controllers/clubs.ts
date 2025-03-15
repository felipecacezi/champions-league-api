import { FastifyRequest, FastifyReply } from "fastify";
import { Club } from '../DTO/club'
import { Create } from '../services/clubs/Create'
import { List } from '../services/clubs/List'

export class ClubsController {
    static async list(request: FastifyRequest, reply: FastifyReply) {
        try {
            const list = new List();
            const responseList = await list.execute();
            reply.status(200).send({ 
                success: true, 
                message: "Clubes listados com sucesso.", 
                data: responseList
            });
        } catch (error: any) {
            reply.status(error.status).send({ 
                success: error.success, 
                message: error.message ?? "Ocorreu um erro desconhecido ao listar os clubes.", 
                data: []
            });
        }
    }

    static async get(request: FastifyRequest<{ Params: { parameter: string; value: string } }>, reply: FastifyReply){
        try {
            const list = new List();
            await list.filterClub(request.params.parameter, request.params.value);
            const responseList = await list.execute(false);
            reply.status(201).send({ 
                success: true, 
                message: responseList ? "" : "Nenhum clube encontrado.", 
                data: responseList
            });  
        } catch (error: any) {
            reply.status(error.status).send({ 
                success: error.success, 
                message: error.message ?? "Ocorreu um erro desconhecido ao listar os clubes.", 
                data: []
            });
        }
    }

    static async create(request: FastifyRequest<{body: Club}>, reply: FastifyReply){
        try {
            const create = new Create(request.body);  
            const responseCreate = await create.execute();    
            reply.status(201).send({ 
                success: true, 
                message: "Clube criado com sucesso.", 
                data: responseCreate
            });      
        } catch (error: any) {                
            reply.status(error.status).send({ 
                success: error.success, 
                message: error.message ?? "Ocorreu um erro desconhecido ao criar um novo clube.", 
                data: []
            });
        }        
    }
}