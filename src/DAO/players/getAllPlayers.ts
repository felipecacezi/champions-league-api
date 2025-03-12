import { FirebaseConnection } from "../../configs/firebaseConnection";
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database';

export async function getAllPlayers() {
    try {
        const dbConn = new FirebaseConnection();
        const db = await dbConn.getDb();
        let snapshot: any; 
        snapshot = await get(ref(db, `players`));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        throw {
            status: 500,
            success: false,
            message: 'Ocorreu um erro desconhecido ao buscar jogadores.'
        }
    }
}