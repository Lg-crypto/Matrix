import {Matrix} from "./Matrix.js";

const setWeight = (inp,nNodes)=>{
    const x = [];
    for (let i = 0; i < inp.cols; i++) {
        const y = [];
        for (let j = 0; j < nNodes; j++) {
            y.push(Math.random()*10)/(i+1);    
        }
        x.push(y)
    }
    return new Matrix(inp.cols, nNodes,x);
}
const calculateLayer = (inp,wgt,bias)=>{
    const input = inp.mult(wgt); // 2 linhas , 2 colunas
    return input.add(bias);
}

const correctOutput = new Matrix(2,1,[[1000],[0]]);

const input = new Matrix(2,1,[[1],[1]]); // 2 linhas , 1 coluna
console.log("Entrada :\n"+input.data.join('\n'));

const weightHidden = setWeight(input, 2); // 1 linha , 2 colunas

const biasH = new Matrix(input.rows,weightHidden.cols,13);

const hidden = calculateLayer(input,weightHidden,biasH);
console.log("Oculta :\n"+hidden.data.join('\n'));

const weightOutput = setWeight(hidden, 1);
const biasOut = new Matrix(hidden.rows, weightOutput.cols, 10);

const output = calculateLayer(hidden, weightOutput, biasOut);
console.log("Saída :\n"+output.data.join('\n'));

console.log("Correct Output:\n"+correctOutput.data);

const error = correctOutput.sub(output);
console.log("Error :\n"+error.data.join("\n"));