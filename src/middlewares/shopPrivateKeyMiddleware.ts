import { isShopPrivateKeyValid } from '../services/shopService';

const shopPrivateKeyMiddleware = () => {
    const shopPrivateKeyMiddlewareBefore = async (request: any): Promise<any> => {
        const { event } = request;

        const authorizationPk = event.headers.AuthorizationPK || event.headers.authorizationpk;

        if (!authorizationPk) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Falta el header AuthorizationPK' }),
            };
        }

        try {
            const isPrivateKeyValid = await isShopPrivateKeyValid(authorizationPk).catch(error => {
                throw new Error(`Error al validar la PK: ${error.message}`);
            });
            if (!isPrivateKeyValid) {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ message: 'Esta PK no se encuentra en nuestros registros o es invalida' }),
                };
            }
            // return request; // Continúa con la ejecución normal
        } catch (error) {
            throw new Error(`Error al validar la PK: ${error.message}`);
        }
    }

    const shopPrivateKeyMiddlewareError = async (request: any) => {
        const { error } = request;

        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }

    return {
        before: shopPrivateKeyMiddlewareBefore,
        onError: shopPrivateKeyMiddlewareError,
    }
}

export default shopPrivateKeyMiddleware;