export class IdGenerator {
    static generateId(prefix: string): string {
        const uniquePart = crypto.randomUUID().replace(/-/g, "").substring(0, 10 - prefix.length).toUpperCase();
        return prefix + uniquePart;
    }
}