import style from "./SearchTerm.module.scss"
import cs from "classnames"

interface Props {
  term: string
  onClear: () => void
}

export function SearchTerm({ term, onClear }: Props) {
  return (
    <div className={cs(style.container)}>
      <strong>{term}</strong>
      <i aria-hidden className="fas fa-times" onClick={onClear} />
    </div>
  )
}
