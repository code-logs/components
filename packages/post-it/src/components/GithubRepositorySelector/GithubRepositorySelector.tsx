import { useEffect, useState } from 'react'
import { Repository } from '../../types'

export interface GithubRepositorySelectorProps {
  repositories: Repository[]
  onRepositoryChangeHandler: (owner: string, repo: string) => void
}

const GithubRepositorySelector = ({
  repositories,
  onRepositoryChangeHandler,
}: GithubRepositorySelectorProps) => {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  useEffect(() => {}, [selectedRepo])

  useEffect(() => {
    if (!selectedRepo) return

    onRepositoryChangeHandler(selectedRepo.owner.login, selectedRepo.name)
  }, [onRepositoryChangeHandler, selectedRepo])

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
