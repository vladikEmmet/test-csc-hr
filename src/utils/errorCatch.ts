export const errorCatch = (err: any) => {
    if(err instanceof Error) {
        return ("Error: " + err.message);
    } else {
        return err;
    }
}