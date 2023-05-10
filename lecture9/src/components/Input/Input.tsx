import './input.css';
export function Input ({placeholder, id, className, name, onKeyUp, defaultValue}: {placeholder: string, id: string, name?: string, defaultValue?: string, className?: string, onKeyUp?:React.KeyboardEventHandler<HTMLInputElement>}){
    const classNames = "input " + className
    return (
        <input type="text" className={classNames} name={name} placeholder={placeholder} id={id} onKeyUp={onKeyUp} defaultValue={defaultValue}/>
    )
}