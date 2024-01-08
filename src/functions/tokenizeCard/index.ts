
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { tokenizeCard } from '../../services/cardService';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const authorizationHeader = event.headers.Authorization || event.headers.authorization;
        if (!authorizationHeader) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Authorization header missing' }),
            };
        }
        if (!event.body) {
            throw new Error('No se recibió el cuerpo de la solicitud.');
        }
        const body = JSON.parse(event.body);
        const token = await tokenizeCard(body, authorizationHeader);
        const response = {
            statusCode: 200,
            body: token,
        };
        return response;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        }
    }
}


export { handler };