const database = new pylon.KVNamespace('database');
export const giveaways = new pylon.KVNamespace('giveaways');
export const mutes = new pylon.KVNamespace('mutes');

export async function getData(id: string) {}

export async function saveData(id: string, data: object) {}
