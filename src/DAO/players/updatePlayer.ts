import { ref, set } from 'firebase/database';
import { FirebaseConnection } from "../../configs/firebaseConnection";
import { Player } from '../../DTO/player';

export async function updatePlayer(playerId: number, arPlayer: Player) {    
    const dbConn = new FirebaseConnection();
    const db = await dbConn.getDb();
    const episodeRef = ref(db, `players/${playerId}`);    
    await set(episodeRef, arPlayer);
    return arPlayer;
}