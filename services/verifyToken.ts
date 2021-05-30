import { clientApiRoutes } from '../utils/apiUtils'
import { apiClient } from '../utils/utils'

async function verifyToken(): Promise<boolean> {
  try {
    await apiClient().post(clientApiRoutes.VERIFY)

    return true
  } catch (error) {
    return false
  }
}

export { verifyToken }
