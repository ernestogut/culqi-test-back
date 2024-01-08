export enum CardType {
    Unknown,
    Visa,
    Mastercard,
    Amex
}

export class Card {
    private cardNumber: number;
    private cvv: number;
    private expirationMonth: string;
    private expirationYear: string;
    private email: string;

    constructor(cardNumber: number, cvv: number, expirationMonth: string, expirationYear: string, email: string) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.email = email;
    }

    public validateCard(): void {
        this.validateCardNumber();
        this.validateLength();
        this.validateCVV();
        this.validateExpirationMonth();
        this.validateExpirationYear();
        this.validateEmail();
    }

    public validateLength(): void {
        const cardNumberString: string = this.cardNumber.toString();
        if (cardNumberString.length < 13 || cardNumberString.length > 16) {
            throw new Error('Longitud de número de tarjeta no válida.');
        }
    }

    public validateCardNumber(): void {
        const cardNumberString: string = this.cardNumber.toString();

        // Validacion con el Algoritmo de Luhn

        const len: number = cardNumberString.length;
        let total: number = 0;
        let isEven: boolean = false;

        for (let i: number = len - 1; i >= 0; i--) {
            let digit: number = parseInt(cardNumberString.charAt(i), 10);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            total += digit;
            isEven = !isEven;
        }

        if (total % 10 !== 0) {
            throw new Error('Número de tarjeta no válido.');
        }
    }

    public validateCVV(): void {
        const cardType: CardType = this.getCardType();
        const expectedCVVLength: number = (cardType === CardType.Amex) ? 4 : 3;

        if (this.cvv.toString().length !== expectedCVVLength) {
            throw new Error(`CVV no válido para ${CardType[cardType]}.`);
        }

        if (cardType === CardType.Visa || cardType === CardType.Mastercard) {
            if (this.cvv !== 123) {
                throw new Error(`CVV no válido para ${CardType[cardType]}.`);
            }
        } else if (cardType === CardType.Amex) {
            if (this.cvv !== 4532) {
                throw new Error(`CVV no válido para ${CardType[cardType]}.`);
            }
        } else {
            throw new Error('Tipo de tarjeta desconocido.');
        }
    }

    public validateExpirationMonth(): void {
        const numericMonth: number = parseInt(this.expirationMonth, 10);
        if (numericMonth < 1 || numericMonth > 12) {
            throw new Error('Mes de expiración no válido.');
        }
    }

    public validateExpirationYear(): void {
        const currentYear: number = new Date().getFullYear();
        const numericYear: number = parseInt(this.expirationYear, 10);
        if (numericYear < currentYear || numericYear > currentYear + 5 || this.expirationYear.length !== 4) {
            throw new Error('Año de expiración no válido.');
        }
    }

    public validateEmail(): void {
        const validDomains: string[] = ['gmail.com', 'hotmail.com', 'yahoo.es'];
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const limitLength: number = 100;
        if (!emailRegex.test(this.email) || !validDomains.some(domain => this.email.endsWith(domain)) || this.email.length > limitLength) {
            throw new Error('Correo electrónico no válido o dominio no admitido.');
        }
    }

    public getCardType(): CardType {
        const cardNumberString: string = this.cardNumber.toString();

        if (cardNumberString.startsWith('4')) {
            return CardType.Visa;
        } else if (cardNumberString.startsWith('51') || cardNumberString.startsWith('52') ||
            cardNumberString.startsWith('53') || cardNumberString.startsWith('54') ||
            cardNumberString.startsWith('55')) {
            return CardType.Mastercard;
        } else if (cardNumberString.startsWith('34') || cardNumberString.startsWith('37')) {
            return CardType.Amex;
        } else {
            return CardType.Unknown;
        }
    }

    public getCardNumber(): number {
        return this.cardNumber;
    }

    public getCVV(): number {
        return this.cvv;
    }

    public getExpirationMonth(): string {
        return this.expirationMonth;
    }

    public getExpirationYear(): string {
        return this.expirationYear;
    }

    public getEmail(): string {
        return this.email;
    }

    public setCardNumber(cardNumber: number): void {
        this.cardNumber = cardNumber;
    }

    public setCVV(cvv: number): void {
        this.cvv = cvv;
    }

    public setExpirationMonth(expirationMonth: string): void {
        this.expirationMonth = expirationMonth;
    }

    public setExpirationYear(expirationYear: string): void {
        this.expirationYear = expirationYear;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

}