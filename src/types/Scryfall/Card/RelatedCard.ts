import type { ScryfallObject } from '@/types/Scryfall/Object'

export type RelatedCard = {
  id: string
  object: typeof ScryfallObject.RelatedCard
  component: 'token' | 'meld-part' | 'meld-result' | 'combo_piece'
  name: string
  type_line: string
  uri: string
}
