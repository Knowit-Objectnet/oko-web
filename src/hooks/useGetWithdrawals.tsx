import { Withdrawal } from '../types';
import { useGetFetchAPI } from './useGetFetchAPI';

export const useGetWithdrawals: () => Array<Withdrawal> = () => {
    return useGetFetchAPI<Withdrawal>(`/api/withdrawals`, (withdrawal: Withdrawal) => {
        withdrawal.start = new Date(withdrawal.start);
        withdrawal.end = new Date(withdrawal.end);
        return withdrawal;
    });
};
