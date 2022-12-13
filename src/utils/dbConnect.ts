// ============== Import Packages ================
import { ConnectOptions, connect } from 'mongoose';
// ===============================================
export default class DBConnection {
    static readonly defaultOptions: ConnectOptions = {
        compressors: ['snappy']
    };

    constructor() {
        // do nothing
    }

    static readonly connect = async (uri: string, options?: ConnectOptions) => {
        try {
            const mongoose = await connect(uri, {
                ...this.defaultOptions,
                ...options
            });
            mongoose.set('strictQuery', true);
            process.stdout.write('Connected successfully to Database !! :) \n');
        } catch (err) {
            process.stdout.write(`Something Went Wrong !! :( ===> ${err} \n`);
        }
    };
}
