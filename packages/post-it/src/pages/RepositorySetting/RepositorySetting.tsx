import Card from '../../components/Card/Card'
import GithubProfile from '../../components/GithubProfile/GithubProfile'
import GithubApi from '../../utils/github-api'
import styles from './RepositorySetting.module.scss'

const RepositorySetting = () => {
  return GithubApi.isAuthorized ? (
    <GithubProfile />
  ) : (
    <Card
      title="인증 실패"
      description="Github Access Token을 불러올 수 없습니다."
    >
      <p className={styles.noAuthMessage}>
        <a
          href="https://github.com/settings/tokens"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
        에서 Access Token을 발급 받아 환경변수에 설정해야 합니다.
      </p>
    </Card>
  )
}

export default RepositorySetting
