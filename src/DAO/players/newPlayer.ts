import { FirebaseConnection } from "../../configs/firebaseConnection";
import { push, ref } from 'firebase/database';

export async function newPlayer(data: any) {
    try {
        const dbConn = new FirebaseConnection();
        const db = await dbConn.getDb();
        return await push(ref(db, 'players'), data).key        
    } catch (error) {
        throw{
            status: 500,
            success: false,
            message: 'Ocorreu um erro desconhecido ao cadastrar um novo jogador.'
        }
    }
}