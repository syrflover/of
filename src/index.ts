export type Result<T = any, E = any> = [T, E?];

export async function of<T extends Promise<any>, E>(
    p: T,
): Promise<Result<T extends Promise<infer P> ? P : any, E>> {
    return p
        .then((r) => {
            return [r] as Result;
        })
        .catch((error) => {
            if (error !== undefined && error !== null) {
                return [undefined as any, error];
            }
            return [undefined as any, new Error('Empty Error') as any];
        });
}

export default of;
