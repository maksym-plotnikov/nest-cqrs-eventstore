import { readdirSync } from 'fs-extra';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { exec } from 'child_process';

if (!(<any>module).hot) {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}
dotenv.config({
    path: join(__dirname, `../../.${process.env.NODE_ENV}.env`),
});

async function run() {
    try {
        const path = join(__dirname, '/files/');
        const projections = readdirSync(path);
        for (const projection of projections) {
            const filepath = join(path, projection);
            const [name] = projection.split('.');
            const url = `http://${process.env.EVENTSTORE_DB_URL}/projections/continuous?name=${name}&type=js&enabled=true`;
            await exec(`curl -i -d@${filepath} ${url}`);
        }
    } catch (e) {
        console.error(e);
    }
}

run();
