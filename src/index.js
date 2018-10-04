module.exports = function getZerosCount(number, base) {
    function factorization(number, result) {
        result = result || [];
        const root = Math.sqrt(number);
        let x = 2;
        if (number % x) {
            x = 3;
            while ((number % x) && (x < root)) {
                x = (x + 2);
            }
        }
        x = (x <= root) ? x : number;
        result.push(x);
        return (x === number) ? result : factorization((number / x), result);
    };

    function getFactorizationObjList(factArr) {
        const objList = [];
        factArr.forEach((elem) => {
            const foundedObj = objList.find((item) => item.value === elem);
            if (foundedObj) {
                foundedObj.exponent++;
            } else {
                objList.push({
                    value: elem,
                    exponent: 1
                })
            }
        })

        return objList;
    }

    function getZeroList(number, factObjList) {
        const zeroList = factObjList.map((elem) => {
            const decomposition = getZerosCount(number, elem.value);
            return Math.floor(decomposition / elem.exponent);
        })

        return zeroList;
    }

    function getZerosCount(number, factor) {
        let count = 0;

        for (let i = factor; number / i > 1; i *= factor) {
            count += Math.floor(number / i);
        }

        return count;
    }

    const factArr = factorization(base);

    const factObjList = getFactorizationObjList(factArr);

    const zeroList = getZeroList(number, factObjList);

    return Math.min(...zeroList);
}
