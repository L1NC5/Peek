import axios from 'axios'

export const ScryfallErrorHandler = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response?.data) {
    throw error.response.data
  }
  throw error
}
