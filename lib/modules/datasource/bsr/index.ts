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
    return null;
  }

  @cache({
    namespace: `datasource-${BsrDatasource.id}`,
    // TODO: types (#7154)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    key: ({ packageName }: Partial<DigestConfig>) => `${packageName}-digest`,
  })
  getReleases(config: GetReleasesConfig): Promise<ReleaseResult | null> {
    return null;
  }
}
