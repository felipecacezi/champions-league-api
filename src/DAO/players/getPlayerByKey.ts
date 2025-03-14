import { FirebaseConnection } from "../../configs/firebaseConnection";
import { ref, get } from 'firebase/database';

export async function getPlayerByKey(key: string) {
    const dbConn = new FirebaseConnection();
    const db = await dbConn.getDb();
    let snapshot: any; 
    snapshot = await get(ref(db, `players/${key}`));
    return snapshot.exists() ? snapshot.val() : null;
}