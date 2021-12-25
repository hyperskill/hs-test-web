class OutcomeError extends Error {
    constructor(message: string | undefined) {
        super(message);
    }
}

export default OutcomeError;
