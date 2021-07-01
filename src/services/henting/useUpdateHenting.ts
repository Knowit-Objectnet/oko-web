import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiPlanlagtHenting,
    ApiPlanlagtHentingPatch,
    patchPlanlagtHenting,
    planlagtHentingDefaultQueryKey,
} from './HentingService';

export const useUpdateHenting = (): UseMutationResult<ApiPlanlagtHenting, ApiError, ApiPlanlagtHentingPatch> =>
    useMutationWithInvalidation<ApiPlanlagtHenting, ApiError, ApiPlanlagtHentingPatch>(
        (updatedHenting) => patchPlanlagtHenting(updatedHenting),
        [planlagtHentingDefaultQueryKey],
    );
