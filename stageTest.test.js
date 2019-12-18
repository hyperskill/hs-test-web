const logger = require('./logger');
const hs = require('./stageTest');

let logged = '';
let savedConsole;

beforeEach(() => {
    logged = '';
    savedConsole = console.log;
    console.log = msg => {
        logged += logger.filter(msg);
    }
});

afterEach(() => {
    console.log = savedConsole;
});


test('Accepted single test', () => {
    hs.test(
        () => hs.accept()
    );
    expect(logged).toBe('test OK\n');
});

test('Accepted two tests', () => {
    hs.test(
        () => hs.accept(),
        () => hs.accept(),
    );
    expect(logged).toBe('test OK\n');
});

test('Wrong answer test 1', () => {
    hs.test(
        () => hs.wrong(),
        () => hs.accept(),
    );
    expect(logged).toBe('Wrong answer in test #1\n');
});

test('Wrong answer test 2', () => {
    hs.test(
        () => hs.accept(),
        () => hs.wrong(),
    );
    expect(logged).toBe('Wrong answer in test #2\n');
});

test('Wrong answer with feedback test 1', () => {
    hs.test(
        () => hs.wrong('Write better code'),
        () => hs.wrong(),
    );
    expect(logged).toBe('Wrong answer in test #1\n\nWrite better code\n');
});

test('Wrong answer with feedback test 2', () => {
    hs.test(
        () => hs.accept(),
        () => hs.wrong('Please write better code'),
    );
    expect(logged).toBe('Wrong answer in test #2\n\nPlease write better code\n');
});
