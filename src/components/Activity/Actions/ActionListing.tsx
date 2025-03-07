import style from "../Action.module.scss"
import cs from "classnames"
import { TActionComp } from "./Action"
import { UserBadge } from "../../User/UserBadge"
import { DisplayTezos } from "../../Display/DisplayTezos"

export const ActionListing: TActionComp = ({ action, verbose }) => (
  <>
    <UserBadge
      className={cs(style.user)}
      hasLink={true}
      user={action.issuer!}
      size="small"
    />
    <span>
      listed <strong>{verbose ? action.objkt!.name : `#${action.objkt!.iteration}`}</strong> for
    </span>
    <span className={cs(style.price)}>
      <DisplayTezos
        formatBig={false}
        mutez={action.numericValue}
        tezosSize="regular"
      />
    </span>
  </>
)