import { Branch } from '../../types'

export interface GithubBranchSelectorProps {
  branches: Branch[]
}

const GithubBranchSelector = ({ branches }: GithubBranchSelectorProps) => {
  return (
    <select disabled={!branches.length}>
      {branches.map((branch) => (
        <option key={branch.name}>{branch.name}</option>
      ))}
    </select>
  )
}

export default GithubBranchSelector
