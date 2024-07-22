import { CSSProperties } from "react";

interface Props {
  label:      string;
  onClick:    ()=>void
  styles?:    CSSProperties
  disabled?:  boolean;
}

export const FloatingActionButton = ({label, onClick, styles, disabled=false}: Props) => {
  return (
    <button
      className='btn btn-dark'
      style={{
        ...styles,
        position: 'absolute',
        bottom:   100,
        right:    100,
        width:    '12em',
        height:   '3em',
        zIndex:   10
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
