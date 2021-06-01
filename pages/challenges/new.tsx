import { ReactElement } from 'react'
import withAuth from '../../components/hoc/with-auth/WithAuth'

export const NewChallenge = (): ReactElement => <div>New challenge</div>

export default withAuth(NewChallenge)
