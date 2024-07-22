import { ReactNode } from 'react'

interface Props {
  children:   ReactNode
  type:       'title' | 'subtitle' | 'description'
}

export const Text = ({children, type}: Props) => {

  const conditionalStyle = (textType: typeof type): string => {
    switch (textType) {
      case 'title':
        return 'h2 text-wrap fw-bold'
      case 'subtitle':
        return 'text-body-secondary text-wrap'
      case 'description':
        return 'text-body-secondary text-wrap fw-ligther'
      default:
        return ''
    }
  }


  return (
    <span className={conditionalStyle(type)}>
      {children}
    </span>
  )
}
