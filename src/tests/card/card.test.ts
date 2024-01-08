import { Card, CardType } from '../../models/card';
import * as fs from 'fs';

const createValidCard = (data: any): Card => {
    return new Card(data.card_number, data.cvv, data.expiration_month, data.expiration_year, data.email);
};

const createInvalidCard = (data: any): Card => {
    return new Card(data.card_number, data.cvv, data.expiration_month, data.expiration_year, data.email);
};

describe('Card Validation Tests', () => {

    const validCardVisaData = JSON.parse(fs.readFileSync('./src/tests/card/__mocks__/visa-mastercard/valid-card-request.json', 'utf8'));
    const invalidCardVisaData = JSON.parse(fs.readFileSync('./src/tests/card/__mocks__/visa-mastercard/invalid-card-request.json', 'utf8'));
    const validCardAmexData = JSON.parse(fs.readFileSync('./src/tests/card/__mocks__/amex/valid-card-request.json', 'utf8'));
    const invalidCardAmexData = JSON.parse(fs.readFileSync('./src/tests/card/__mocks__/amex/invalid-card-request.json', 'utf8'));

    describe('validateCard', () => {
        test('Invalid Card Number Luhn Algorithm for Visa/Mastercard', () => {
            const invalidCard = createInvalidCard(invalidCardVisaData);
            expect(() => invalidCard.validateCardNumber()).toThrow('Número de tarjeta no válido.');
        });

        test('Valid Card Number for Visa/Mastercard', () => {
            const validCard = createValidCard(validCardVisaData);
            expect(() => validCard.validateCardNumber()).not.toThrow();
        });

        test('Invalid Card Number Length for Visa/Mastercard', () => {
            const invalidCard = createInvalidCard(invalidCardVisaData);
            expect(() => invalidCard.validateLength()).toThrow('Longitud de número de tarjeta no válida.');
        });


        test('Invalid Card Number Luhn Algorithm for Year Amex', () => {
            const invalidCard = createInvalidCard(invalidCardAmexData);
            expect(() => invalidCard.validateCardNumber()).toThrow('Número de tarjeta no válido.');
        });

        test('Valid Card Number for Amex', () => {
            const validCard = createValidCard(validCardAmexData);
            expect(() => validCard.validateCardNumber()).not.toThrow();
        });

        test('Invalid Card Number Length for Amex', () => {
            const invalidCard = createInvalidCard(invalidCardAmexData);
            expect(() => invalidCard.validateLength()).toThrow('Longitud de número de tarjeta no válida.');
        });

    });

    describe('validateCVV', () => {
        test('Valid CVV for VISA/Mastercard', () => {
            const validCard = createValidCard(validCardVisaData);
            expect(() => validCard.validateCVV()).not.toThrow();
        });

        test('Invalid CVV Length for VISA/Mastercard', () => {
            const invalidCard = createInvalidCard(invalidCardVisaData);
            expect(() => invalidCard.validateCVV()).toThrow(`CVV no válido para ${CardType[invalidCard.getCardType()]}`);
        });


        test('Valid CVV for Amex', () => {
            const validCard = createValidCard(validCardAmexData);
            expect(() => validCard.validateCVV()).not.toThrow();
        });

        test('Invalid CVV Length for Amex', () => {
            const invalidCard = createInvalidCard(invalidCardAmexData);
            expect(() => invalidCard.validateCVV()).toThrow(`CVV no válido para ${CardType[invalidCard.getCardType()]}`);
        });

    });

    describe('validateExpirationMonth', () => {
        test('Valid Expiration Month', () => {
            const validCard = createValidCard(validCardVisaData);
            expect(() => validCard.validateExpirationMonth()).not.toThrow();
        });

        test('Invalid Expiration Month', () => {
            const invalidCard = createInvalidCard(invalidCardVisaData);
            expect(() => invalidCard.validateExpirationMonth()).toThrow('Mes de expiración no válido.');
        });

        test('Valid Expiration Month Amex', () => {
            const validCard = createValidCard(validCardAmexData);
            expect(() => validCard.validateExpirationMonth()).not.toThrow();
        });

        test('Invalid Expiration Month Amex', () => {
            const invalidCard = createInvalidCard(invalidCardAmexData);
            expect(() => invalidCard.validateExpirationMonth()).toThrow('Mes de expiración no válido.');
        });
    });

    describe('validateExpirationYear', () => {
        test('Valid Expiration Year Visa/Mastercard', () => {
            const validCard = createValidCard(validCardVisaData);
            expect(() => validCard.validateExpirationYear()).not.toThrow();
        });

        test('Invalid Expiration Year Visa/Mastercard', () => {
            const invalidCard = createInvalidCard(invalidCardVisaData);
            expect(() => invalidCard.validateExpirationYear()).toThrow('Año de expiración no válido.');
        });

        test('Valid Expiration Year Amex', () => {
            const validCard = createValidCard(validCardAmexData);
            expect(() => validCard.validateExpirationYear()).not.toThrow();
        });

        test('Invalid Expiration Year Amex', () => {
            const invalidCard = createInvalidCard(invalidCardAmexData);
            expect(() => invalidCard.validateExpirationYear()).toThrow('Año de expiración no válido.');
        });
    });

    describe('validateEmail', () => {
        test('Valid Email', () => {
            const validCard = createValidCard(validCardVisaData);
            expect(() => validCard.validateEmail()).not.toThrow();
        });

        test('Invalid Email', () => {
            const invalidCard = createInvalidCard(invalidCardVisaData);
            expect(() => invalidCard.validateEmail()).toThrow('Correo electrónico no válido o dominio no admitido.');
        });

        test('Valid Email Amex', () => {
            const validCard = createValidCard(validCardAmexData);
            expect(() => validCard.validateEmail()).not.toThrow();
        });

        test('Invalid Email Amex', () => {
            const invalidCard = createInvalidCard(invalidCardAmexData);
            expect(() => invalidCard.validateEmail()).toThrow('Correo electrónico no válido o dominio no admitido.');
        });
    });

});