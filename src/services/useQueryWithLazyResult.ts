import { useQuery, UseQueryOptions } from 'react-query';
import { Failure, Initial, LazyResult, Loading, Success } from 'lemons';

export const useQueryWithLazyResult = <TResult, TError>(
    queryOptions: UseQueryOptions<TResult, TError>,
): LazyResult<TError, TResult> => {
    const { data, isLoading, error } = useQuery<TResult, TError>(queryOptions);

    if (data) {
        return Success(data);
    }

    if (isLoading) {
        return Loading();
    }

    if (error) {
        return Failure(error);
    }

    return Initial();
};
