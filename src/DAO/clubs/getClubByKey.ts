import { FirebaseConnection } from "../../configs/firebaseConnection";
import { ref, get } from 'firebase/database';

export async function getClubByKey(key: string) {
    const dbConn = new FirebaseConnection();
    const db = await dbConn.getDb();
    let snapshot: any; 
    snapshot = await get(ref(db, `clubs/${key}`));
    return snapshot.exists() ? snapshot.val() : null;
}