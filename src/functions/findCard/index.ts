
import middy from '../../../node_modules/@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { findCardToken } from '../../services/cardService';
import shopPrivateKeyMiddleware from '../../middlewares/shopPrivateKeyMiddleware';
const findCardHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const authorizationHeader = event.headers.Authorization || event.headers.authorization;

        if (!authorizationHeader) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Authorization header missing' }),
            };
        }
        const card = await findCardToken(authorizationHeader);
        const response = {
            statusCode: 200,
            body: JSON.stringify(card),
        };
        return response;
    } catch (error) {
        throw new Error('Error al encontrar la tarjeta: ' + error);
    }
}
export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
    .use(shopPrivateKeyMiddleware())
    .handler(findCardHandler);   
