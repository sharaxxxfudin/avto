type InputRangeProps = {
    label?: string;
    fromName: string;
    toName: string;
    fromValue: string | number;
    toValue: string | number;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    options?: (string | number)[]; // если задано, это select!
    type?: string;
    min?: number;
    max?: number;
    step?: number;
    placeholderFrom?: string;
    placeholderTo?: string;
    disabled?: boolean;
  };
  
  export const InputRange = ({
    label,
    fromName,
    toName,
    fromValue,
    toValue,
    onChange,
    options,
    type = "text",
    min,
    max,
    step,
    placeholderFrom,
    placeholderTo,
    disabled = false,
  }: InputRangeProps) => {
    const baseControl =
      "w-full px-4 py-2 rounded-xl bg-[#23252e] text-white border border-[#37394a] focus:ring-2 focus:ring-red-600 outline-none transition text-base appearance-none";
  
    return (
        <div className="w-full">
        {label && (
          <label className="block mb-2 text-xs text-gray-400">{label}</label>
        )}
        <div className="flex gap-0 w-full">
          {options ? (
            <>
              <select
                name={fromName}
                className={
                  baseControl +
                  " rounded-l-xl rounded-r-none border-r-0"
                }
                value={fromValue}
                onChange={onChange}
                disabled={disabled}
              >
                <option value="">{placeholderFrom || "от"}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <select
                name={toName}
                className={
                  baseControl +
                  " rounded-r-xl rounded-l-none"
                }
                value={toValue}
                onChange={onChange}
                disabled={disabled}
              >
                <option value="">{placeholderTo || "до"}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <input
                name={fromName}
                value={fromValue}
                onChange={onChange}
                className={
                  baseControl +
                  " rounded-l-xl rounded-r-none border-r-0"
                }
                placeholder={placeholderFrom || "от"}
                type={type}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
              />
              <input
                name={toName}
                value={toValue}
                onChange={onChange}
                className={
                  baseControl +
                  " rounded-r-xl rounded-l-none"
                }
                placeholder={placeholderTo || "до"}
                type={type}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
              />
            </>
          )}
        </div>
      </div>
      
    );
  };
  