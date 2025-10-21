import crypto from 'crypto'

export function generateTempPassword(lastName = "", randomLen = 10) {
    const specialSymbols = "!@#$%^&*()_+[]{}|;:,.<>?"
    const randomSymbol = specialSymbols[Math.floor(Math.random() * specialSymbols.length)]

    // clean lastName, remove spaces; fallback to 'XX' if not provided
    const cleaned = String(lastName || "") 
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z]/g, "")

        let prefix ="Xx"
        if(cleaned.length >= 2) {
            // capitalizing first letter of the temp pass
            prefix = cleaned.slice(0, 1).toUpperCase() + cleaned.slice(1, 2).toLowerCase()
        } else if (cleaned.length === 1) {
            prefix = cleaned.slice(0, 1).toUpperCase() + "x";
        }

    // random part using base64-safe-ish data derived from crypto
    const randomPart = crypto.randomBytes(Math.ceil(randomLen * 0.6)).toString("base64").replace(/[+/=]/g, "").slice(0, randomLen);

    return `${randomSymbol}${prefix}${randomPart}`;
    
}