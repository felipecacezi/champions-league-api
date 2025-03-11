import { FirebaseConnection } from "../../configs/firebaseConnection";
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database';

export async function getAllPlayers() {
    const dbConn = new FirebaseConnection();
    const db = dbConn.getDb();

    let snapshot: any; 
    snapshot = await get(ref(db, `episodes`));
    return snapshot.exists() ? snapshot.val() : null;
}