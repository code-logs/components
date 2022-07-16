import { Branch, GithubProfile, Repository } from '../types'

class GithubApi {
  private static readonly GITHUB_ACCESS_TOKEN =
    process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  private static readonly GITHUB_API_BASE_URL = 'https://api.github.com'
  private static readonly PROFILE_ENDPOINT = '/user'
  private static readonly REPOSITORIES_ENDPOINT = '/user/repos'
  private static readonly BRANCHES_ENDPOINT = (
    owner: string,
    repo: string
  ) => `/repos/${owner}/${repo}/branches
  `
  private static readonly REQUEST_INIT = (method: string) =>
    ({
      method,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${this.GITHUB_ACCESS_TOKEN}`,
      },
    } as RequestInit)

  static get accessToken() {
    return this.GITHUB_ACCESS_TOKEN
  }

  static get isAuthorized() {
    return !!process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  }

  static async profile(): Promise<GithubProfile> {
    const response = await fetch(
      this.buildApi(this.PROFILE_ENDPOINT),
      this.REQUEST_INIT('get')
    )
    return await response.json()
  }

  static async repositories(): Promise<Repository[]> {
    const response = await fetch(
      this.buildApi(this.REPOSITORIES_ENDPOINT),
      this.REQUEST_INIT('get')
    )
    return await response.json()
  }

  static async branches(owner: string, repo: string): Promise<Branch[]> {
    const response = await fetch(
      this.buildApi(this.BRANCHES_ENDPOINT(owner, repo)),
      this.REQUEST_INIT('get')
    )

    return await response.json()
  }

  static buildApi(endpoint: string) {
    return `${this.GITHUB_API_BASE_URL}${endpoint}`
  }
}

export default GithubApi
