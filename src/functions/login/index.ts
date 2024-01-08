
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { login } from '../../services/userService';
const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            throw new Error('No se recibió el cuerpo de la solicitud.');
        }
        const { username, password } = JSON.parse(event.body);
        const user = await login(username, password);
        const response = {
            statusCode: 200,
            body: JSON.stringify(user),
        };
        return response;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error }),
        }
    }
}


export { handler };