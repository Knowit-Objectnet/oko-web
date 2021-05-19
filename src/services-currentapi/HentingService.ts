export interface ApiHenting {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    merknad: string | null;
    henteplanId: string; //UUID
    avlyst: string; //LocalTimeDate
}

export interface ApiHentingParams {
    id?: string;
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    merknad?: string;
    henteplanId?: string;
    avlyst?: boolean;
}

export interface ApiHentingPatch {
    id: string;
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    merknad?: string;
    avlyst?: string; //LocalTimeDate
}
