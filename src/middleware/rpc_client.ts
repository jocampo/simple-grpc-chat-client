import { credentials } from 'grpc';
import { models, services } from '@jocampo/simple-grpc-chat-proto/proto-objects';

const REMOTE_SERVER = "0.0.0.0:5001";

const username = "Jorge";

const client = new services.ChatService(
    REMOTE_SERVER as any,
    credentials.createInsecure() as any
);

const onData = (message: models.Message) => {
    if (message.sender && message.sender.name === username) {
        return;
    }
    console.log(message);
};

export const joinChat = () => {
    const channel = client.join_chat(models.Message.create({
        id: 1,
        text: 'Joining chat!',
        sender: models.User.create({
            id: 1,
            name: username
        })
    }));

    (channel as any).on("data", onData);

    // bind something to "send messages"
    client.send_message({

    } as models.Message);
};

export const sendMessage = (text: string) => {
    client.send_message(models.Message.create({
        id: 1,
        text,
        sender: models.User.create({
            id: 1,
            name: username
        })
    }));
};