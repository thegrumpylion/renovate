import { logger } from '../../../logger';
import type { Http } from '../../../util/http';
import type { GetRepositoryByFullNameRequest, GetRepositoryCommitByReferenceRequest, ListRepositoryTagsRequest, Repository, RepositoryCommit, RepositoryTag } from './types';

export class Bsr {
  constructor(http: Http, token: string) {
    this.http = http;
    this.token = token;
  }

  private http: Http;
  private token: string;

  async getRepositoryByFullName(name: string): Promise<Repository | null> {
    const url =
      'https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName';
    try {
      const req: GetRepositoryByFullNameRequest = {
        fullName: name,
      }
      const body = (
        await this.http.postJson<{ repository: Repository }>(url, {
          body: req,
          token: this.token,
        })
      ).body;
      return body.repository;
    } catch (err) {
      logger.debug({ err }, 'Failed to get repository from BSR');
      return null;
    }
  }

  async getRepositoryCommitByReference(repoOwner: string, repoName: string, ref: string): Promise<RepositoryCommit | null> {
    const url =
      'https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitByReference';
    try {
      const req: GetRepositoryCommitByReferenceRequest = {
        repositoryOwner: repoOwner,
        repositoryName: repoName,
        reference: ref,
      }
      const body = (
        await this.http.postJson<{ repositoryCommit: RepositoryCommit }>(url, {
          body: req,
          token: this.token,
        })
      ).body;
      return body.repositoryCommit;
    } catch (err) {
      logger.debug({ err }, 'Failed to get repository from BSR');
      return null;
    }
  }

  async listRepositoryTags(repoId: string): Promise<RepositoryTag[] | null> {
    const url =
      'https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryTagService/ListRepositoryTags';
    try {
      const req: ListRepositoryTagsRequest = {
        repositoryId: repoId,
        pageSize: 100,
        reverse: true,
      }
      const body = (
        await this.http.postJson<{ repositoryTags: RepositoryTag[] }>(url, {
          body: req,
          token: this.token,
        })
      ).body;
      return body.repositoryTags;
    } catch (err) {
      logger.debug({ err }, 'Failed to get repository from BSR');
      return null;
    }
  }
}
