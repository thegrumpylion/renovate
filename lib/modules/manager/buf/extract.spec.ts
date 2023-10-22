import { Fixtures } from '../../../../test/fixtures';
import { extractPackageFile } from '.';

describe('modules/manager/buf/extract', () => {
  describe('extractPackageFile()', () => {
    it('has bsr as datasource', () => {
      expect(
        extractPackageFile(Fixtures.get('buf.yaml'), 'buf.yaml')
      ).toBeNull();
    });
  });
});
