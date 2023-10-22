import { BsrDatasource } from '../../datasource/bsr';
import { extractPackageFile } from './extract';

export { extractPackageFile };

export const displayName = 'Buf';
export const url = 'https://buf.build';

export const defaultConfig = {
  fileMatch: ['(^|/)buf\\.yaml$'],
};

export const supportedDatasources = [BsrDatasource.id];
