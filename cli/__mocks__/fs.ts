export const writeFile = jest.fn().mockImplementation((path, data, cb) => {
    cb()
})
export const existsSync = jest.fn()
export const mkdirSync = jest.fn()


export default {
    existsSync,
    mkdirSync,
    writeFile
}