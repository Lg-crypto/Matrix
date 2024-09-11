import {Matrix} from "./Matrix.js";

const setWeight = (inp,nNodes)=>{
    const x = [];
    for (let i = 0; i < inp.cols; i++) {
        const y = [];
        for (let j = 0; j < nNodes; j++) {
            y.push(Math.random()*10)/(j+1);    
        }
        x.push(y)
    }
    return new Matrix(inp.cols, nNodes,x);
}
const calculateLayer = (inp,wgt,bias)=>{
    const input = inp.mult(wgt); // 2 linhas , 2 colunas
    return input.add(bias);
}
const createNeuralNetwork = ()=>{
    const correctOutput = new Matrix(2,1,[[100],[0]]);

    const input = new Matrix(2,1,[[1],[1]]); // 2 linhas , 1 coluna

    const weightHidden = setWeight(input, 2); // 1 linha , 2 colunas

    const biasH = new Matrix(input.rows,weightHidden.cols,10);

    const hidden = calculateLayer(input,weightHidden,biasH);

    const weightOutput = setWeight(hidden, 1);

    const biasOut = new Matrix(hidden.rows, weightOutput.cols, 10);

    const output = calculateLayer(hidden, weightOutput, biasOut);

    const error = correctOutput.sub(output);
    return ({
        output,
        error
    });
}
const cloneNeuralNetwork = (quantityOfClones)=>{
    const results = [];
    let errorMedia = 0;
    let score = 0;

    for(let counter = 0; counter < quantityOfClones; counter++){
        results.push(createNeuralNetwork());
    }
    results.forEach((tentativa)=>{
        tentativa.error.data.forEach((error)=>{
            if(error[0] === 0){
                score+=1;
                return 1;
            }
            errorMedia += error[0];
        })
    })

    const accuracy = parseFloat(score / quantityOfClones);
    errorMedia = errorMedia/quantityOfClones;
    return {score,accuracy,errorMedia};
}

const testing = cloneNeuralNetwork(1000);
console.log(testing);

