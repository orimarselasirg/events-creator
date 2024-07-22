import { NavLink }  from 'react-router-dom'
import githubLogo   from '../../assets/github-142-svgrepo-com.svg'

interface Props {
  url:  string
  text: string
}

export const GithubComponent = ({url, text}: Props) => {
  return (
    <div className=' position-absolute top-0 w-100 d-flex justify-content-end p-3'>
      <NavLink to={url} target='_blank' className='text-decoration-none'>
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <span className='bg-dark text-bg-dark p-2 rounded'>{text}</span>
            <img src={githubLogo} alt="" width={30} className='m-2'/>
        </div>
      </NavLink>
    </div>
  )
}