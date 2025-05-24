import type {
  ScryfallFormatType,
  ScryfallLegalityType,
} from '@/types/Scryfall/Card/values'

export type ScryfallLegalitiesFieldType = Record<
  ScryfallFormatType,
  ScryfallLegalityType
>
