
const firstLetter = (name: string) => {
        const lettersName = new Set(name.toLowerCase().replace(/[^a-z]/g, ''));
        const alph = 'abcdefghijklmnopqrstuvwxyz';

        for (const letter of alph) {
            if (!lettersName.has(letter)) {
                return letter.toUpperCase();
            }
        }

        return '-';
}

export default firstLetter