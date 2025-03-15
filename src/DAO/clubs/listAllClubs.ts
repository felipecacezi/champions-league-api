import { FirebaseConnection } from "../../configs/firebaseConnection";
import { ref, get } from 'firebase/database';

export async function getAllClubs() {
    try {
        const dbConn = new FirebaseConnection();
        const db = await dbConn.getDb();
        let snapshot: any; 
        snapshot = await get(ref(db, `clubs`));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        throw {
            status: 500,
            success: false,
            message: 'Ocorreu um erro desconhecido ao buscar clubes.'
        }
    }
}