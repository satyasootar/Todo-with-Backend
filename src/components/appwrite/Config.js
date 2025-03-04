import { Client, Databases } from 'appwrite';

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67c5bd550029dc641a9e');

const databases = new Databases(client)

export { client, databases }


