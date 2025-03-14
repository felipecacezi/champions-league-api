import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove } from 'firebase/database';
import { FirebaseConnection } from "../../configs/firebaseConnection";

export async function deletePlayer(playerId: number) {
    const dbConn = new FirebaseConnection();
    const db = await dbConn.getDb();
    const episodeRef = ref(db, `players/${playerId}`);
    return await remove(episodeRef);
}