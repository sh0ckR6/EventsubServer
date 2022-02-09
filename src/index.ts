import express from 'express';

const app = express();

const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

const VERIFICATION_MESSAGE = 'webhook_callback_verification';
const NOTIFICATION_MESSAGE = 'notification';
const REVOCATION_MESSAGE = 'revocation';

app.post('/eventsub', (req, res) => {
    let notification = JSON.parse(req.body);

    if (req.headers[MESSAGE_TYPE] === VERIFICATION_MESSAGE) {
        res.status(200).send(notification.challenge);
        return;
    }

    if (req.headers[MESSAGE_TYPE] === NOTIFICATION_MESSAGE) {
        console.log('Incoming event!');
        res.sendStatus(204);
        return;
    }

    if (req.headers[MESSAGE_TYPE] === REVOCATION_MESSAGE) {
        console.log(`EventSub subscription for ${notification.subscription.type} revoked! Reason: ${notification.subscription.status}`);
        res.sendStatus(204);
        return;
    }
});

app.listen(3000, () => console.log('Server started!'));