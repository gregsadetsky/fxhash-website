import { User } from '../../../../types/entities/User'
import { UserProfileLayout } from "../../../../containers/User/UserProfileLayout"
import { getServerSidePropsUserById, getServerSidePropsUserByName } from "../../../../services/ServerSideProps/ServerSidePropsUser"
import { UserCollection } from "../../../../containers/User/UserCollection"
import { ReactElement } from "react"


interface Props {
  user: User
}

const UserPageCollectionArticles = ({ user }: Props) => {
  return (
    <UserCollection user={user} activeTab="articles"/>
  )
}

UserPageCollectionArticles.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserProfileLayout
      user={page.props.user}
      activeTab="collection"
      hideSectionSpacing
    >
      {page}
    </UserProfileLayout>
  )
}

export const getServerSideProps = getServerSidePropsUserById

export default UserPageCollectionArticles
