import { ChangeEvent } from "react";

interface Props {
  label:        string;
  type:         string;
  name:         string;
  placeholder:  string;
  value:        string | number;
  onChange:     (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?:      (e: ChangeEvent<HTMLInputElement>) => void;
  error:        string | null
}

export const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  onBlur,
  error
}: Props) => {
  
  return (
    <>
    {type !== 'file' &&
      <div className="m-3">
        <span className='text-black-100 fw-medium'>{label}</span>
        <input
          className='form-control mt-2'
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e)=>onChange(e)}
          onBlur={onBlur}
          accept="image/*"
        />
        {error && <span className="text-danger" style={{fontSize: 10}}>{error}</span>}
      </div>
    }
    { type === 'file' &&
      <div className="m-3">
        <span className='text-black-100 fw-medium'>{label}</span>
        <input
          className='form-control mt-2'
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={(e)=>onChange(e)}
          onBlur={onBlur}
          accept="image/*"
        />
        {error && <span className="text-danger" style={{fontSize: 10}}>{error}</span>}
      </div>
    }
    </>
  )
}
