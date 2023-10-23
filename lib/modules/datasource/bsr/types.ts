const Visibility = {
  VISIBILITY_UNSPECIFIED: 0,
  VISIBILITY_PUBLIC: 1,
  VISIBILITY_PRIVATE: 2,
} as const;
type Visibility = typeof Visibility[keyof typeof Visibility];

export interface Repository {
  // primary key, unique, immutable
  id: string;

  // immutable
  createTime: Date;

  // mutable
  updateTime: Date;

  // unique, mutable
  name: string;

  // foreign key, mutable
  userId?: string;

  // foreign key, mutable
  organizationId?: string;

  visibility: Visibility;

  // deprecated means this repository is deprecated.
  deprecated: boolean;

  // deprecationMessage is the message shown if the repository is deprecated.
  deprecationMessage: string;

  // ownerName is the name of the owner of the repository,
  // either a username or organization name.
  ownerName: string;

  // description is the user configurable description of the repository.
  description: string;

  // url is the user configurable URL in the description of the repository,
  // always included the scheme and will not have a #fragment suffix.
  url: string;

  // defaultBranch in a BSR repository. It is used when syncing a git repository, to make sure both
  // default branches (BSR and Git) are in sync. By default, every BSR repository is created with a
  // "main" default branch.
  defaultBranch: string;
}

export interface RepositoryTag {
  // primary key, unique.
  // tags are based on labels, so if a label has been moved, the ID will point to the
  // updated entry in the labels table.
  id: string;

  // immutable
  createTime: Date;

  // We reserve field number '3' for the update_time.
  // updateTime: Date;

  // The name of the repository tag, e.g. "6e2e7f24718a76caa32a80d0e2b1841ef2c61403".
  name: string;

  // The name of the commit this tag belongs to.
  commitName: string;

  // The username of the author of the tag.
  author: string;
}

export interface RepositoryCommit {
  // primary key, unique, immutable
  id: string;

  // immutable
  createTime: Date;

  // The digest of the commit.
  digest: string;

  // The name of the commit.
  // This is what is referenced by users.
  // Unique, immutable.
  name: string;

  // The branch on which this commit was created.
  branch: string;

  // The username of the user who authored this commit.
  author: string;

  // The tags associated with this commit
  tags: RepositoryTag[];

  // The commit's draft name, if it is a draft commit.
  draftName: string;

  // spdxLicenseId is the license of the commit, based on the
  // license file pushed, which should be one of the identifier defined in
  // https://spdx.org/licenses, and will be not set if the license file is not
  // presented or cannot be classified into a known license.
  spdxLicenseId: string;

  // The manifest digest of the commit.
  manifestDigest: string;

  // Number of tags associated with the commit.
  tagCount: number;

  // Number of git commits with associated with the BSR commit.
  gitCommitsCount: number;
}

export interface RepositoryBranch {
  // primary key, unique.
  // branches are based on labels, so when a branch is pushed to, the ID will point to the
  // updated entry in the labels table.
  id: string;

  // The name of the repository branch.
  name: string;

  // The name of the latest commit on the branch.
  latestCommitName: string;

  // isMainBranch denotes whether this branch is considered the main branch of the repository.
  isMainBranch: boolean;

  // The last update time of the branch.
  lastUpdateTime: Date;

  // The ID of the user who updated the branch.
  lastUpdateUserId: string;

  // The author name of the most recent associated git commit of the branch. May be an empty string
  // if the last branch update doesn't have a git commit associated.
  lastUpdateGitAuthorName: string;

  // The git commit hash of the most recent associated git commit of the branch. May be an empty string
  // if the last branch update doesn't have a git commit associated.
  lastUpdateGitCommitHash: string;
}

export interface GetRepositoryByFullNameRequest {
  fullName: string;
}

export interface GetRepositoryCommitByReferenceRequest {
  // The owner of the repository which the reference belongs to.
  repositoryOwner: string;

  // The name of the repository which the reference belongs to.
  repositoryName: string;

  // The reference that should be resolved to a commit. Can be a tag or commit.
  reference: string;
}

export interface ListRepositoryTagsRequest {
  // The ID of the repository whose tags should be listed.
  repositoryId: string;

  pageSize: number;

  // The first page is returned if this is empty.
  pageToken?: string;

  reverse?: boolean;
}
