export class DateUtils {

    static getToday(): string {
        return new Date().toISOString().split('T')[0];
    }

    static getCurrentYear(): number {
        return new Date().getFullYear();
    }

    static getCurrentMonth(): number {
        return new Date().getMonth() + 1;
    }

}