interface InputProps {
  type: string;
  name: string;
  value?: string | number;
  labelText?: string;
  options?: string[];
}

const Input: React.FC<InputProps> = (props) => {
  switch (props.type) {
    case "text":
      return (
        <div>
          <label>{props.labelText!}</label>
          <input value={props.value} type="text" />
        </div>
      );

    case "textarea":
      return (
        <div>
          <textarea />
        </div>
      );

    case "select":
      return (
        <div>
          <label>{props.labelText}</label>
          <select>
            {props.options!.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      return (
        <div>
          <label>{props.labelText}</label>
          <input type="text" />
        </div>
      );
  }
};

export default Input;
