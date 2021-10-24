import { FC } from "react";

const Description: FC<any> = ({
  title = "Title",
  description = "Description",
  placeholder = "Placeholder",
  name = "",
  value = "",
  labelStyle = {},
  desStyle = {},
  error = false,
  onChange = () => {},
}) => {
  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
        style={labelStyle}
      >
        {title}
      </label>
      <textarea
        className={
          error
            ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        }
        id="grid-first-name"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
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
export default Description;
