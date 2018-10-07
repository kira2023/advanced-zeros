module.exports = function getZerosCount(number, base) {
    function factorization(base, result) {
        result = result || [];
        const root = Math.sqrt(base);
        let x = 2;
        if (base % x) {
            x = 3;
            while ((base % x) && (x < root)) {
                x = (x + 2);
            }
        }
        x = (x <= root) ? x : base;
        result.push(x);
        return (x === base) ? result : factorization((base / x), result);
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
