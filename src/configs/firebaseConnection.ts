import { firebaseConfig } from '../configs/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

export class FirebaseConnection {
    private fireApp: any;
    private db: any;

    constructor() {
        this.fireApp = initializeApp(firebaseConfig);
        this.db = getDatabase(this.fireApp);
    }

    async getDb(){
        return this.db;
    }

    async insert(data: any, schema: any){
        try {
            return await push(ref(this.db, schema), data);            
        } catch (error) {
            throw {
                status: 500,
                success: false,
                message: `Ocorreu um erro durante a inserção.`
            };
        }
    }
}