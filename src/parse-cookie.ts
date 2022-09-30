export const ParseCookie = (cookie: string, target: string) => {
    const tokens = cookie.split(";");
    
    for (let i = 0; i < tokens.length; i++) {
        const t= tokens[i];
        const [k,v] = t.split("=");

        if (k === target) {
            return v;
        }
    }

    return undefined
}