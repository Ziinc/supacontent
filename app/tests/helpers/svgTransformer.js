module.exports = {
    process() {
        return {code: ""};
    },
    async processAsync(){
        return Promise(resolve => {
            resolve({code: ""})
        })
    },
    getCacheKey() {
        // The output is always the same.
        return 'svgTransform';
    },
};