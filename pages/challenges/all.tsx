import withAuth from '../../components/hoc/with-auth/WithAuth'

export const AllChallenges = (): JSX.Element => (
  <div>
    <div className="h-10 flex flex-row-reverse items-center">Toolbar</div>
    <div>Card grid</div>
  </div>
)

export default withAuth(AllChallenges)
