import { logger } from '../../../logger';
import type { Http } from '../../../util/http';

interface Repository {
  repository: {
    id: string;
    createTime: string;
    updateTime: string;
    name: string;
    organizationId: string;
    visibility: string;
    ownerName: string;
  };
  counts: {
    tagCount: number;
  };
}

export class Bsr {
  constructor(http: Http, token: string) {
    this.http = http;
    this.token = token;
  }

  private http: Http;
  private token: string;

  async getRepository(name: string): Promise<Repository | null> {
    const url =
      'https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName';
    try {
      const body = (
        await this.http.postJson<Repository>(url, {
          body: {
            fullName: name,
          },
          token: this.token,
        })
      ).body;
      return body;
    } catch (err) {
      logger.debug({ err }, 'Failed to get repository from BSR');
      return null;
    }
  }

  async getTags(name: string): Promise<Repository | null> {
    const url =
      'https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName';
    try {
      const body = (
        await this.http.postJson<Repository>(url, {
          body: {
            fullName: name,
          },
          token: this.token,
        })
      ).body;
      return body;
    } catch (err) {
      logger.debug({ err }, 'Failed to get repository from BSR');
      return null;
    }
  }
}
