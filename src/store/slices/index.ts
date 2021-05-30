import { RootState } from '..';

export const locationStateSelector = (state: RootState) => state.location;
export const offlineStateSelector = (state: RootState) => state.offline;
