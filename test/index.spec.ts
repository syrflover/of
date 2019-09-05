import { assert } from 'chai';
import { of } from '../src';

describe('test of', () => {
    it('success', async () => {
        const [res, error] = await of(Promise.resolve(1));

        assert.strictEqual(res, 1);
        assert.strictEqual(error, undefined);
    });

    it('error', async () => {
        const [res, error] = await of(Promise.reject(new Error('ERROR_TEST')));

        assert.strictEqual(res, undefined);
        assert.strictEqual(error instanceof Error, true);
        assert.strictEqual(error!.message, 'ERROR_TEST');
    });

    it('empty error', async () => {
        const [res, error] = await of(Promise.reject());

        assert.strictEqual(res, undefined);
        assert.strictEqual(error instanceof Error, true);
    });

    it('custom error', async () => {
        class CustomError {
            constructor(message: string) {
                this.customMessage = message;
            }

            public customMessage: string;
        }

        const [res, error] = await of<any, CustomError>(
            Promise.reject(new CustomError('ERROR_TEST')),
        );

        assert.strictEqual(res, undefined);
        assert.strictEqual(error instanceof CustomError, true);
        assert.strictEqual(error!.customMessage, 'ERROR_TEST');
    });
});
