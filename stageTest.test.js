const hs = require('./stageTest');


test('Accepted single test', async () => {
    let res = await hs.test(
        () => hs.accept()
    );
    expect(res['type']).toBe('accept');
});

test('Accepted two tests', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => hs.accept(),
    );
    expect(res['type']).toBe('accept');
});

test('Wrong answer test 1', async () => {
    let res = await hs.test(
        () => hs.wrong(),
        () => hs.accept(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #1');
});

test('Wrong answer test 2', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => hs.wrong(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #2');
});

test('Wrong answer with feedback test 1', async () => {
    let res = await hs.test(
        () => hs.wrong('Write better code'),
        () => hs.wrong(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #1\n\nWrite better code');
});

test('Wrong answer with feedback test 2', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => hs.wrong('Please write better code'),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #2\n\nPlease write better code');
});

test('Custom wrong answer test 1', async () => {
    let res = await hs.test(
        () => {return {'type' : 'wrong', 'message' : ''}},
        () => hs.accept(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #1');
});

test('Custom wrong answer test 2', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => {return {'type' : 'wrong', 'message' : ''}},
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #2');
});

test('Custom wrong answer with feedback test 1', async () => {
    let res = await hs.test(
        () => {return {'type' : 'wrong', 'message': 'Write better code'}},
        () => hs.wrong(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #1\n\nWrite better code');
});

test('Custom wrong answer with feedback test 2', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => {return {'type' : 'wrong', 'message': 'Please write better code'}},
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #2\n\nPlease write better code');
});

test('Fatal error wrong result type test 1', async () => {
    let res = await hs.test(
        () => 'Wrong result',
        () => hs.wrong('Please write better code'),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #1, please send the report to support@hyperskill.org\n\n' + 
        'Invalid result type. Typeof result == "string", but should be "object".');
});

test('Fatal error wrong result type test > 1', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => hs.accept(),
        () => hs.accept(),
        () => 'Wrong result test 4',
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #4, please send the report to support@hyperskill.org\n\n' + 
        'Invalid result type. Typeof result == "string", but should be "object".');
});

test('Fatal error wrong result type test 1', async () => {
    let res = await hs.test(
        () => undefined,
        () => hs.wrong('Please write better code'),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #1, please send the report to support@hyperskill.org\n\n' + 
        'Invalid result type. Typeof result == "undefined", but should be "object".');
});

test('Fatal error wrong result type test > 1', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => hs.accept(),
        () => hs.accept(),
        () => undefined,
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #4, please send the report to support@hyperskill.org\n\n' + 
        'Invalid result type. Typeof result == "undefined", but should be "object".');
});

test('Fatal error wrong function test 1', async () => {
    let res = await hs.test(
        'Wrong function',
        () => hs.wrong('Please write better code'),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #1, please send the report to support@hyperskill.org\n\n' + 
        'Invalid test. Typeof testCase == "string", but should be "function".');
});

test('Fatal error wrong function test > 1', async () => {
    let res = await hs.test(
        () => hs.accept(),
        () => hs.accept(),
        'Wrong function test 3',
        () => hs.accept(),
        () => hs.accept(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #3, please send the report to support@hyperskill.org\n\n' + 
        'Invalid test. Typeof testCase == "string", but should be "function".');
});

test('Fatal error wrong result type test 1', async () => {
    let res = await hs.test(
        () => {return {type: "wrong type"}},
        () => hs.accept(),
        () => hs.accept(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #1, please send the report to support@hyperskill.org\n\n' + 
        'Invalid result. result["type"] == "wrong type", but should be "wrong" or "accept".');
});

test('Fatal error wrong result type test > 1', async () => {
    let res = await hs.test(
        () => {return {type: "accept"}},
        () => hs.accept(),
        () => hs.accept(),
        () => hs.accept(),
        () => {return {type: "wrong type test 5"}},
        () => {return {type: "accept"}},
        () => hs.accept(),
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error in test #5, please send the report to support@hyperskill.org\n\n' + 
        'Invalid result. result["type"] == "wrong type test 5", but should be "wrong" or "accept".');
});

test('Fatal error no tests', async () => {
    let res = await hs.test();
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Fatal error during testing, please send the report to support@hyperskill.org\n\n' + 
        'Cannot find tests.');
});

test('Async test no errors', async () => {
    let res = await hs.test(
        async () => {
            return hs.accept();
        }
    );
    expect(res['type']).toBe('accept');
});

test('Async test wrong answer', async () => {
    let res = await hs.test(
        () => hs.accept(),
        async () => hs.wrong('Wrong async test')
    );
    expect(res['type']).toBe('wrong');
    expect(res['message']).toBe('Wrong answer in test #2\n\nWrong async test');
});
