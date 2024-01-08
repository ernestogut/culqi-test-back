import { Card } from '../models/card';
import { Token } from '../models/token';
import { CardToken } from '../entities/CardToken';
import { initializeAppDataSource } from '../../lib/mongodb-connection';
export const tokenizeCard = async (cardData: any, authorizationHeader: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const card = new Card(
                cardData.card_number,
                cardData.cvv,
                cardData.expiration_month,
                cardData.expiration_year,
                cardData.email
            );

            card.validateCard();
            const token = await saveToDatabase(card, authorizationHeader);
            if (!token) {
                reject("Error saving to the database");
                return;
            }
            resolve(token.token);
        } catch (error) {
            reject(error);
        }
    });
};

const generateToken = (): { token: string, expirationTime: number } => {
    const token = new Token();
    const generatedToken = token.getToken();
    const expirationTime = token.getExpirationTime().getTime();
    return {
        token: generatedToken,
        expirationTime: expirationTime,
    };
};

const saveToDatabase = async (card: Card, shopPrivateKey: string): Promise<CardToken | null> => {
    return new Promise(async (resolve, reject) => {
        try {
            const AppDataSource = await initializeAppDataSource();

            // Verificar la conexión a la base de datos
            if (!AppDataSource.isConnected) {
                reject("Database connection not established");
                return;
            }

            const cardToken = new CardToken();
            const { token, expirationTime } = generateToken();
            cardToken.token = token;
            cardToken.privateKey = shopPrivateKey;
            cardToken.expirationTime = expirationTime;
            cardToken.cardNumber = card.getCardNumber();
            cardToken.cvv = card.getCVV();
            cardToken.expirationMonth = card.getExpirationMonth();
            cardToken.expirationYear = card.getExpirationYear();
            cardToken.email = card.getEmail();

            const cardTokenRepository = AppDataSource.getMongoRepository(CardToken);
            const savedCardToken = await cardTokenRepository.save(cardToken);

            resolve(savedCardToken); // Resuelve la promesa con el objeto guardado
        } catch (error) {
            console.error("Error saving to the database:", error);
            // Rechaza la promesa con el error
            reject(error);
        }
    });
};


export const findCardToken = async (token: string): Promise<CardToken | null> => {
    try {
        const AppDataSource = await initializeAppDataSource();

        // Verificar la conexión a la base de datos
        if (!AppDataSource.isConnected) {
            throw new Error("Database connection not established");
        }

        const currentDateTime = new Date().getTime();
        const cardTokenRepository = AppDataSource.getMongoRepository(CardToken);
        const cardToken = await cardTokenRepository.findOne({
            where: {
                token: token,
                expirationTime: { $gte: currentDateTime }, // Ajusta según tu campo de expiración
            },
            select: ['cardNumber', 'expirationMonth', 'expirationYear', 'email'],
        });

        if (!cardToken) {
            throw "El token proporcionado ha expirado. Por favor, vuelva a solicitar un nuevo token";
        }

        return cardToken; // Resuelve la promesa con el objeto guardado
    } catch (error) {
        console.error("Error in findCardToken:", error.message);
        throw error;
    }
};
