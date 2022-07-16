import { useEffect, useState } from 'react'
import { Branch } from '../../types'
import GithubApi from '../../utils/github-api'

export interface GithubBranchSelectorProps {
  owner: string | null
  repo: string | null
}

const GithubBranchSelector = ({ owner, repo }: GithubBranchSelectorProps) => {
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    if (!owner || !repo) return
    GithubApi.branches(owner, repo).then(setBranches)
  }, [owner, repo])

  return (
    <select disabled={!branches.length}>
      {branches.map((branch) => (
        <option key={branch.name}>{branch.name}</option>
      ))}
    </select>
  )
}

export default GithubBranchSelector
