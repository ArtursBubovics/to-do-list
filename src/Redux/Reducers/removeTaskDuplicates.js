const removeDuplicates = (arr, key) => {
    return arr.reduce((acc, current) => {
        const x = acc.find(item => item[key] === current[key]);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
};

export default removeDuplicates;