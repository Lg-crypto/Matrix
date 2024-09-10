export class Matrix {
    constructor(rows, cols, values) {
        this.rows = rows;
        this.cols = cols;
        this.values = values;
        this.data = [];

        if (Array.isArray(this.values)){
            for (let i = 0; i < rows; i++) {
                let arr = [];
                for (let j = 0; j < cols; j++) {
                    arr.push(this.values == [] ? Math.floor(Math.random() * 10) : this.values[i][j] );
                }
                this.data.push(arr);
            }
        }else{
            for (let i = 0; i < rows; i++) {
                let arr = [];
                for (let j = 0; j < cols; j++) {
                    arr.push(this.values ? this.values : Math.floor(Math.random() * 10));
                }
                this.data.push(arr);
            }
        }
    }

    // Método de adição de matrizes
    add(otherMatrix) {
        if (this.rows !== otherMatrix.rows || this.cols !== otherMatrix.cols) {
            throw new Error('As matrizes devem ter as mesmas dimensões para adição.');
        }

        const result = [];
        for (let i = 0; i < this.rows; i++) {
            let res = [];
            for (let j = 0; j < this.cols; j++) {
                res.push(this.data[i][j] + otherMatrix.data[i][j]);
            }
            result.push(res);
        }

        // Atualiza as propriedades da matriz atual
        this.rows = result.length;
        this.cols = result[0].length;
        this.data = result;
        return this
    }

    // Método de subtração de matrizes
    sub(otherMatrix) {
        if (this.rows !== otherMatrix.rows || this.cols !== otherMatrix.cols) {
            throw new Error('As matrizes devem ter as mesmas dimensões para subtração.');
        }

        const result = [];
        for (let i = 0; i < this.rows; i++) {
            let res = [];
            for (let j = 0; j < this.cols; j++) {
                res.push(this.data[i][j] - otherMatrix.data[i][j]);
            }
            result.push(res);
        }

        // Atualiza as propriedades da matriz atual
        this.rows = result.length;
        this.cols = result[0].length;
        this.data = result;
        return this
    }

    // Método de multiplicação de matrizes
    mult(otherMatrix) {

        //A.cols === B.rows
        //C === A.rows x B.cols
        if (this.cols !== otherMatrix.rows) {
            throw new Error('Número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.');
        }

        const result = [];
        for (let i = 0; i < this.rows; i++) {
            let res = [];
            for (let j = 0; j < otherMatrix.cols; j++) {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.data[i][k] * otherMatrix.data[k][j];
                }
                res.push(sum);
            }
            result.push(res);
        }

        this.rows = result.length;
        this.cols = result[0].length;
        this.data = result;
        return this
    }

    // Método de divisão de matrizes
    div(otherMatrix) {
        if (this.rows !== otherMatrix.rows || this.cols !== otherMatrix.cols) {
            throw new Error('As matrizes devem ter as mesmas dimensões para divisão.');
        }

        const result = [];
        for (let i = 0; i < this.rows; i++) {
            let res = [];
            for (let j = 0; j < this.cols; j++) {
                if (otherMatrix.data[i][j] === 0) {
                    throw new Error('Divisão por zero detectada.');
                }
                let r = this.data[i][j] / otherMatrix.data[i][j];
                res.push(r);
            }
            result.push(res);
        }

        // Atualiza as propriedades da matriz atual
        this.rows = result.length;
        this.cols = result[0].length;
        this.data = result;
        return this
    }
}
