const logger = require('./logger');
const hs = require('./stageTest');

let logged = '';
let savedConsole;

beforeEach(() => {
    logged = '';
    savedConsole = console.log;
    console.log = msg => {
        logged += logger.filter(msg) + '\n';
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

test('Custom wrong answer test 1', () => {
    hs.test(
        () => {return {'type' : 'wrong', 'message' : ''}},
        () => hs.accept(),
    );
    expect(logged).toBe('Wrong answer in test #1\n');
});

test('Custom wrong answer test 2', () => {
    hs.test(
        () => hs.accept(),
        () => {return {'type' : 'wrong', 'message' : ''}},
    );
    expect(logged).toBe('Wrong answer in test #2\n');
});

test('Custom wrong answer with feedback test 1', () => {
    hs.test(
        () => {return {'type' : 'wrong', 'message': 'Write better code'}},
        () => hs.wrong(),
    );
    expect(logged).toBe('Wrong answer in test #1\n\nWrite better code\n');
});

test('Custom wrong answer with feedback test 2', () => {
    hs.test(
        () => hs.accept(),
        () => {return {'type' : 'wrong', 'message': 'Please write better code'}},
    );
    expect(logged).toBe('Wrong answer in test #2\n\nPlease write better code\n');
});

test('Fatal error wrong result type test 1', () => {
    hs.test(
        () => 'Wrong result',
        () => hs.wrong('Please write better code'),
    );
    expect(logged).toBe('Fatal error in test #1\n\n' + 
        'Invalid result type. Typeof result == "string", but should be "object".\n');
});

test('Fatal error wrong result type test > 1', () => {
    hs.test(
        () => hs.accept(),
        () => hs.accept(),
        () => hs.accept(),
        () => 'Wrong result test 4',
    );
    expect(logged).toBe('Fatal error in test #4\n\n' + 
        'Invalid result type. Typeof result == "string", but should be "object".\n');
});

test('Fatal error wrong result type test 1', () => {
    hs.test(
        () => undefined,
        () => hs.wrong('Please write better code'),
    );
    expect(logged).toBe('Fatal error in test #1\n\n' + 
        'Invalid result type. Typeof result == "undefined", but should be "object".\n');
});

test('Fatal error wrong result type test > 1', () => {
    hs.test(
        () => hs.accept(),
        () => hs.accept(),
        () => hs.accept(),
        () => undefined,
    );
    expect(logged).toBe('Fatal error in test #4\n\n' + 
        'Invalid result type. Typeof result == "undefined", but should be "object".\n');
});

test('Fatal error wrong function test 1', () => {
    hs.test(
        'Wrong function',
        () => hs.wrong('Please write better code'),
    );
    expect(logged).toBe('Fatal error in test #1\n\n' + 
        'Invalid test. Typeof testCase == "string", but should be "function".\n');
});

test('Fatal error wrong function test > 1', () => {
    hs.test(
        () => hs.accept(),
        () => hs.accept(),
        'Wrong function test 3',
        () => hs.accept(),
        () => hs.accept(),
    );
    expect(logged).toBe('Fatal error in test #3\n\n' + 
        'Invalid test. Typeof testCase == "string", but should be "function".\n');
});

test('Fatal error wrong result type test 1', () => {
    hs.test(
        () => {return {type: "wrong type"}},
        () => hs.accept(),
        () => hs.accept(),
    );
    expect(logged).toBe('Fatal error in test #1\n\n' + 
        'Invalid result. result["type"] == "wrong type", but should be "wrong" or "accept".\n');
});

test('Fatal error wrong result type test > 1', () => {
    hs.test(
        () => {return {type: "accept"}},
        () => hs.accept(),
        () => hs.accept(),
        () => hs.accept(),
        () => {return {type: "wrong type test 5"}},
        () => {return {type: "accept"}},
        () => hs.accept(),
    );
    expect(logged).toBe('Fatal error in test #5\n\n' + 
        'Invalid result. result["type"] == "wrong type test 5", but should be "wrong" or "accept".\n');
});

test('Fatal error no tests', () => {
    hs.test();
    expect(logged).toBe('Fatal error during testing\n\n' + 
        'Cannot find tests.\n');
});
