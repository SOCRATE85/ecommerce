import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const runThunk = useCallback(() => {
        setIsLoading(true);
        dispatch(thunk())
            .unwrap()
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, [dispatch, thunk]);

    return [runThunk, isLoading, error];
}