export type PalletItemType = 'text' | 'code-block'

export interface PalletItem {
  type: PalletItemType
  icon: React.ReactElement
}
