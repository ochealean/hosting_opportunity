import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://your-appwrite-server/v1') // Your Appwrite Endpoint
    .setProject('your-project-id'); // Your project ID

const account = new Account(client);

export{account,client};