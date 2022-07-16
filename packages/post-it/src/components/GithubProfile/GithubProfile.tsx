import { useEffect, useState } from 'react'
import GithubApi from '../../utils/github-api'
import {
  Branch,
  GithubProfile as GithubProfileType,
  Repository,
} from '../../types'
import Card from '../Card/Card'
import CircleImage from '../CircleImage/CircleImage'
import styles from './GithubProfile.module.scss'
import GithubRepositorySelector from '../GithubRepositorySelector/GithubRepositorySelector'
import GithubBranchSelector from '../GithubBranchSelector/GithubBranchSelector'

const GithubProfile = () => {
  const [profile, setProfile] = useState<GithubProfileType | null>(null)
  const [repositories, setRepositories] = useState<Repository[] | null>(null)
  const [branches, setBranches] = useState<Branch[] | null>(null)

  const [owner, setOwner] = useState<string | null>(null)
  const [repository, setRepository] = useState<string | null>(null)

  useEffect(() => {
    GithubApi.profile().then(setProfile)
    GithubApi.repositories().then(setRepositories)
  }, [])

  useEffect(() => {
    if (repositories?.length && !owner && !repository) {
      setOwner(repositories[0].owner.login)
      setRepository(repositories[0].name)
    }
  }, [owner, repositories, repository])

  useEffect(() => {
    if (!owner || !repository) return
    GithubApi.branches(owner, repository).then(setBranches)
  }, [owner, repository])

  if (!profile || !repositories?.length || !branches?.length) return <></>

  return (
    <Card title={profile.name} description={profile.login}>
      <div className={styles.profile}>
        <CircleImage src={profile.avatar_url} alt={profile.name} />

        <div className={styles.configurations}>
          <label className="vertical">
            <span>Repository</span>
            <GithubRepositorySelector
              repositories={repositories}
              onRepositoryChangeHandler={(owner, repo) => {
                setOwner(owner)
                setRepository(repo)
              }}
            />
          </label>

          <label className="vertical">
            <span>Branch</span>
            <GithubBranchSelector branches={branches} />
          </label>

          <label className="vertical">
            <span>Document path</span>
            <input type="text" />
          </label>
        </div>
      </div>
    </Card>
  )
}

export default GithubProfile
