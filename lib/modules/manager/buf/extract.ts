import is from '@sindresorhus/is';
import { load } from 'js-yaml';
import { logger } from '../../../logger';
import { getSiblingFileName, localPathExists } from '../../../util/fs';
import { BsrDatasource } from '../../datasource/bsr';
import type { PackageDependency, PackageFile } from '../types';

export async function extractPackageFile(
  content: string,
  fileName: string
): Promise<PackageFile | null> {
  logger.trace({ content }, 'gomod.extractPackageFile()');

  let bufyaml: {
    version: string;
    name: string;
    deps: string[];
  };

  try {
    // TODO: fix me (#9610)
    bufyaml = load(content, { json: true }) as any;
  } catch (err) {
    logger.debug(`Failed to parse buf.yaml from ${fileName}`);
    return null;
  }

  // let buflock: {
  //   version: string;
  //   name: string;
  //   deps: string[];
  // };

  const packageFileVersion = bufyaml.version;

  if (!is.nonEmptyArray(bufyaml?.deps)) {
    logger.debug(`buf module has no dependencies in ${fileName}`);
    return null;
  }

  let deps: PackageDependency[] = [];
  deps = bufyaml.deps.map((dep) => {
    const [pkg, ver] = dep.split(':');
    const res: PackageDependency = {
      depName: pkg,
      currentValue: ver === undefined ? 'latest' : ver,
    };
    return res;
  });

  const res: PackageFile = {
    deps,
    datasource: BsrDatasource.id,
    packageFileVersion,
  };

  const lockFileName = getSiblingFileName(fileName, 'buf.lock');
  // istanbul ignore if
  if (await localPathExists(lockFileName)) {
    res.lockFiles = [lockFileName];
  }

  return res;
}
