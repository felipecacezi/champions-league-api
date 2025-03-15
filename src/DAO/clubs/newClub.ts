import { FirebaseConnection } from "../../configs/firebaseConnection";
import { push, ref } from 'firebase/database';
import { Club } from "../../DTO/club";

export async function newClub(data: Club) {
    try {
        const dbConn = new FirebaseConnection();
        const db = await dbConn.getDb();
        return await push(ref(db, 'clubs'), data).key        
    } catch (error) {
        throw{
            status: 500,
            success: false,
            message: 'Ocorreu um erro desconhecido ao cadastrar um novo clube.'
        }
    }
}