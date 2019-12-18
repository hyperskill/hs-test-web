const logger = require('./logger');

beforeAll(() => {
    logger.disableEduToolsMessages();
});


test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});
