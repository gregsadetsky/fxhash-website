import style from "./MintButton.module.scss"
import effects from "../../styles/Effects.module.scss"
import cs from "classnames"
import { GenerativeToken } from "../../types/entities/GenerativeToken"
import { PropsWithChildren, useContext, useMemo, useState } from "react"
import { Button } from "../../components/Button"
import { UserContext } from "../../containers/UserProvider"
import {
  reserveEligibleAmount,
  reserveSize,
} from "../../utils/generative-token"
import { User } from "../../types/entities/User"
import { Cover } from "../Utils/Cover"

/**
 * The Mint Button displays a mint button component with specific display rules
 * based on the balance, reserve of the token and the eligibility state of the
 * user.
 * display conditions:
 * - if user is in the reserve
 *    - onlyReserveLeft: show button mint, mint from the resserve
 *    - !onlyReserveLeft: show mint button with dropdown
 * - if user is not in the reserve
 *    - onlyReserveLeft: hide mint button
 *    - !onlyReserveLeft: show mint button, mint without the reserve
 */

interface Props {
  token: GenerativeToken
  loading: boolean
  disabled: boolean
  onMint: (consumeReserve: boolean) => void
}
export function MintButton({
  token,
  loading,
  disabled,
  onMint,
  children,
}: PropsWithChildren<Props>) {
  // user ctx
  const { user } = useContext(UserContext)

  const [showDropdown, setShowDropdown] = useState(false)

  // the number of editions left in the reserve
  const reserveLeft = useMemo(() => reserveSize(token), [token])

  // only the reserve is available for minting
  const onlyReserveLeft = reserveLeft === token.balance

  // compute how many editions in reserve the user is eligible for
  const eligibleFor = useMemo(
    () => (user ? reserveEligibleAmount(user as User, token) : 0),
    [user, token]
  )
  const userEligible = eligibleFor > 0

  // should we show the button with dropdown
  const isMintDropdown = userEligible && !onlyReserveLeft
  // conditions required to show the regular mint button
  const isMintButton =
    !isMintDropdown && ((userEligible && onlyReserveLeft) || !onlyReserveLeft)

  return isMintButton || isMintDropdown ? (
    <>
      <div className={cs(style.root)}>
        <Button
          type="button"
          color="secondary"
          size="regular"
          state={loading ? "loading" : "default"}
          disabled={disabled}
          onClick={() => {
            if (isMintButton) {
              // we force mnt from reserve if eligible and only reserve left,
              // otherwise we mint regularly
              onMint(userEligible && onlyReserveLeft)
            } else {
              setShowDropdown(!showDropdown)
            }
          }}
        >
          {children}
          {isMintDropdown && (
            <i
              aria-hidden
              className={cs(`fas fa-caret-down`, style.caret)}
              style={{
                transform: showDropdown ? "rotate(180deg)" : "none",
              }}
            />
          )}
        </Button>

        {showDropdown && (
          <div className={cs(style.dropdown)}>
            <button
              type="button"
              onClick={() => {
                setShowDropdown(false)
                onMint(true)
              }}
            >
              using your reserve
            </button>
            <button
              type="button"
              onClick={() => {
                setShowDropdown(false)
                onMint(false)
              }}
            >
              without reserve
            </button>
          </div>
        )}
      </div>

      {showDropdown && (
        <Cover index={100} onClick={() => setShowDropdown(false)} opacity={0} />
      )}
    </>
  ) : null
}
