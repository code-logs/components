import { useEffect, useState } from 'react'
import { Repository } from '../../types'
import GithubApi from '../../utils/github-api'

export interface GithubRepositorySelectorProps {
  onRepositoryChangeHandler: (owner: string, repo: string) => void
}

const GithubRepositorySelector = ({
  onRepositoryChangeHandler,
}: GithubRepositorySelectorProps) => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  useEffect(() => {
    GithubApi.repositories().then((repositories) => {
      if (!repositories.length) return
      if (!selectedRepo) setSelectedRepo(repositories[0])
      setRepositories(repositories)
    })
  }, [selectedRepo])

  useEffect(() => {
    if (!selectedRepo) return

    onRepositoryChangeHandler(selectedRepo.owner.login, selectedRepo.name)
  }, [onRepositoryChangeHandler, selectedRepo])

  if (!repositories.length) return <></>

  return (
    <select
      onChange={(event) => {
        const repositoryId = Number(event.currentTarget.value)
        const repository = repositories.find(({ id }) => id === repositoryId)
        if (!repository) return

        setSelectedRepo(repository)
      }}
    >
      {repositories.map((repository, index) => (
        <option key={repository.id} value={repository.id}>
          {repository.name}
        </option>
      ))}
    </select>
  )
}

export default GithubRepositorySelector
