import 'discord-interactions';
import { InteractionResponseType } from 'discord-interactions';

export const postInteraction = async (req, res) => {
    // Get the data from the request body's object
    const { type, id, data } = req.body;

    // Check for a Discord ping-pong connection
    // If the verification succeeds, proceed with application commands
    if (type === InteractionResponseType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    };

    // Logic to handle application commands
};