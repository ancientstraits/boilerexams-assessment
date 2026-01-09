import katex from 'katex'

export function indexToLetter(index: number): string {
    return String.fromCharCode(index + 'A'.charCodeAt(0))
}

function isEscape(str: string, i: number): boolean {
    return !(i == 0) && (str[i - 1] == '\\')
}

export function katexRender(str: string): string {
    let ret = ''
    let expr = ''
    let inExpr = false
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '$' && !isEscape(str, i)) {
            if (inExpr) {
                inExpr = false
                ret += katex.renderToString(expr)
                expr = ''
            } else {
                inExpr = true
            }
        } else {
            if (inExpr)
                expr += str[i]
            else
                ret += str[i]
        }
    }
    // if still inside expression, just return expression unrendered
    return ret + expr
}
