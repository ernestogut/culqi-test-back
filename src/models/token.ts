export class Token {

    private token: string;
    private expirationTime: Date;

    constructor() {
        this.token = this.generateToken();
        this.setExpirationTime();
    }

    getToken(): string {
        return this.token;
    }

    getExpirationTime(): Date {
        return this.expirationTime;
    }

    private generateToken(): string {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';

        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }

        return token;
    }

    private setExpirationTime(): void {
        const fifteenMinutesFromNow = new Date();
        fifteenMinutesFromNow.setMinutes(fifteenMinutesFromNow.getMinutes() + 15);
        this.expirationTime = fifteenMinutesFromNow;
    }
}