import { useEffect, useState } from 'react'
import GithubApi from '../../utils/github-api'
import { GithubProfile as GithubProfileType } from '../../types'
import Card from '../Card/Card'
import CircleImage from '../CircleImage/CircleImage'
import styles from './GithubProfile.module.scss'
import GithubRepositorySelector from '../GithubRepositorySelector/GithubRepositorySelector'
import GithubBranchSelector from '../GithubBranchSelector/GithubBranchSelector'

const GithubProfile = () => {
  const [profile, setProfile] = useState<GithubProfileType | null>(null)
  const [chosenOwner, setChosenOwner] = useState<string | null>(null)
  const [chosenRepo, setChosenRepo] = useState<string | null>(null)

  useEffect(() => {
    GithubApi.profile().then(setProfile)
  }, [])

  if (!profile) return <></>

  return (
    <Card title={profile.name} description={profile.login}>
      <div className={styles.profile}>
        <CircleImage src={profile.avatar_url} alt={profile.name} />

        <div className={styles.configurations}>
          <label className="vertical">
            <span>Repository</span>
            <GithubRepositorySelector
              onRepositoryChangeHandler={(owner, repo) => {
                setChosenOwner(owner)
                setChosenRepo(repo)
              }}
            />
          </label>

          <label className="vertical">
            <span>Branch</span>
            <GithubBranchSelector owner={chosenOwner} repo={chosenRepo} />
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
