import { FirebaseConnection } from "../../configs/firebaseConnection";
import { push, ref } from 'firebase/database';

export async function newPlayer(data: Promise<any>) {
    const dbConn = new FirebaseConnection();
    const db = dbConn.getDb();

    const episodeKey = await push(ref(db, 'episodes'), data).key
}