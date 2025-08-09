export function balancedBrackets(str) {
    const stack : string[] = [];
    const openingBrackets = '({[';
    const closingBrackets = ')}]';
    const bracketPairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    console.log(str);
    let lastOpeningBracket: string;
    for (const char of str){
        if (openingBrackets.includes(char)){
            stack.push(char);
        } else if (closingBrackets.includes(char)){
            const lastOpeningBracket = stack.pop() as string;
            if (bracketPairs[lastOpeningBracket] !== char){
                return false;
            }
        }
    }

    return stack.length === 0;
}