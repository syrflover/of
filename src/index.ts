export type Result<T, E> = [T, E?];

export async function of<T, E>(p: Promise<T>): Promise<Result<T, E>> {
    return p
        .then((r) => {
            return [r] as Result<T, E>;
        })
        .catch((error) => {
            if (error !== undefined && error !== null) {
                return [undefined as any, error] as Result<T, E>;
            }
            return [
                undefined as any,
                new Error('Empty Error') as any,
            ] as Result<T, E>;
        });
}

export default of;
