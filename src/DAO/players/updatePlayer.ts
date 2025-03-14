import { initializeApp } from 'firebase/app';
import { ref, set } from 'firebase/database';
import { FirebaseConnection } from "../../configs/firebaseConnection";

export async function updatePlayer(playerId: number, arPlayer: any) {    
    const dbConn = new FirebaseConnection();
    const db = await dbConn.getDb();
    const episodeRef = ref(db, `players/${playerId}`);
    console.log(arPlayer);
    
    await set(episodeRef, arPlayer);
    return arPlayer;
}