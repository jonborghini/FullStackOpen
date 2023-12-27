const Button = ({type, text, handleClick}) => {
  return (
    <button type={type} onClick={handleClick}>{text}</button>
  )
}

export default Button