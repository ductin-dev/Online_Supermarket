import { FC, useState } from "react";

const DropDown: FC<any> = ({
  title = "Title",
  description = "Description",
  name = "",
  defaultOption = 1,
  valueSet = [
    { value: "Option 1", displayName: "Option 1" },
    { value: "Option 2", displayName: "Option 2" },
    { value: "Option 3", displayName: "Option 3" },
  ],
  labelStyle = {},
  desStyle = {},
  onChange = () => {},
  error = false,
}) => {
  const [value, setValue] = useState({ option: defaultOption });

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-state"
        style={labelStyle}
      >
        {title}
      </label>
      <div className="relative">
        <select
          className={
            error
              ? "block appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              : "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          }
          id="grid-state"
          name={name}
          onChange={onChange}
        >
          {valueSet.map((i: any, index: number) => (
            <option key={index} value={i.value}>
              {i.displayName}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <p
        className={
          error ? "text-red-500 text-xs italic" : "text-gray-600 text-xs italic"
        }
        style={desStyle}
      >
        {description}
      </p>
    </>
  );
};
export default DropDown;
