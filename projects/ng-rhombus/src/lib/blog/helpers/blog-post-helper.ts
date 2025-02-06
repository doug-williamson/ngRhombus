export class NgRhombusBlogPostHelper {
    static createSlug(title: string): string {
        const slug = title.toLowerCase().replace(/\s+/g, '-');
        const randomThreeDigitNumber = Math.floor(Math.random() * 1000);
        return `${slug}-${randomThreeDigitNumber}`;
    }
}