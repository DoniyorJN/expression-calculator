function eval() {
    // Do not use eval!!!
    return;
}

let expressionCalculator = (expr) => {
    const openBracket = expr.match(/[(]/g)
    const closeBracket = expr.match(/[)]/g)
    if (openBracket !== null || closeBracket !== null) {
        if (openBracket === null || closeBracket === null) {
            throw new Error('ExpressionError: Brackets must be paired')
        }
        if(openBracket.length !== closeBracket.length) {
            throw new Error('ExpressionError: Brackets must be paired')
        }
    }
    let stack = []
    let queue = []
    let subCalc = (sign, a, b) => {
        switch(sign) {
            case '+': return a + b
                break;

            case '-': return a - b
                break;

            case '*': return a * b
                break;

            case '/': if (b !== 0) {
                return a / b
            } else {
                throw new Error("TypeError: Division by zero.")
            }
                break;
            default:
                break
        }
    }
    let signScore = (sign) => {
        switch(sign) {
            case '+': return 1
                break;
            case '-': return 1
                break;
            case '*': return 2
                break;
            case '/': return 2
                break;
            default:
                break
        }
    }

    let calcQueue = () => {
        let sb = subCalc(stack[stack.length - 1], +queue[queue.length - 2], +queue[queue.length - 1])
        queue.pop()
        queue.pop()
        stack.pop()
        queue.push(sb)
    }
    expr.length < 4 ? expr = expr.split('') : expr = expr.split(' ')
    let i = 0
    let doExpr = () => {
        if(expr[i] !== "") {
            let a = signScore(expr[i])
            let b = signScore(stack[stack.length - 1])
            if(!isNaN(+expr[i])) {
                queue.push(+expr[i])
            } else {
                if ((a < b || a === b) && a!== undefined && b!== undefined) {
                    calcQueue()
                    i--
                }
                else {
                    if(expr[i] === ')') {
                        while(true){
                            if((stack[stack.length - 1] === '(') ) {
                                stack.pop()
                                break
                            }
                            calcQueue()
                        }
                    } else {
                        stack.push(expr[i])
                    }

                }

            }
        }
        i++
        if(i < expr.length || stack.length !== 2 ) {
            doExpr()
        }
    }
    doExpr()
    if(stack.length > 1) {
        if(stack[stack.length - 1] === undefined) {
            stack.pop()
        }
        while (true) {
            if(stack.length === 0) {
                break
            }
            calcQueue()
        }
    }
    return queue[0]
}


module.exports = {
    expressionCalculator
}