import { cache } from '../../../util/cache/package/decorator';
import { Datasource } from '../datasource';
import type { DigestConfig, GetReleasesConfig, ReleaseResult } from '../types';

export class BsrDatasource extends Datasource {
  static readonly id = 'bsr';

  constructor() {
    super(BsrDatasource.id);
  }

  @cache({
    namespace: BsrDatasource.id,
    key: ({ packageName }: DigestConfig) => `${packageName}-digest`,
  })
  override getDigest(
    { packageName }: DigestConfig,
    value?: string | null
  ): Promise<string | null> {
    return Promise.resolve(null);
  }

  @cache({
    namespace: `datasource-${BsrDatasource.id}`,
    key: ({ packageName }: Partial<DigestConfig>) => `${packageName}-digest`,
  })
  getReleases(config: GetReleasesConfig): Promise<ReleaseResult | null> {
    return Promise.resolve(null);
  }
}
