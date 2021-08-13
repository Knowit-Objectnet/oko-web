import { ApiEkstraHenting } from '../services/henting/EkstraHentingService';

export const partnerHasUtlysning = (ekstraHenting: ApiEkstraHenting | undefined, partnerId: string): boolean =>
    !!ekstraHenting && ekstraHenting.utlysninger.some((utlysning) => utlysning.partnerId === partnerId);
