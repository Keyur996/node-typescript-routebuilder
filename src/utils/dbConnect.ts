// ============== Import Packages ================
import { MongoClient, MongoClientOptions } from 'mongodb';
// ===============================================
export default class DBConnection {
    static readonly defaultOptions: MongoClientOptions = {
        compressors: ['snappy']
    };

    constructor() {
        // do nothing
    }

    static readonly connect = async (
        uri: string,
        options?: MongoClientOptions
    ) => {
        try {
            const client = new MongoClient(uri, {
                ...this.defaultOptions,
                ...options
            });
            // Connect the client to the server.
            await client.connect();
            // Establish and verify connection.
            await client.db('admin').command({ ping: 1 });
            process.stdout.write('Connected successfully to Database !! :)');
        } catch (err) {
            process.stdout.write(`Something Went Wrong !! :( ===> ${err}`);
        }
    };
}
