export default function MyInput({
  label,
  register,
  required,
  name,
  placeholder,
  type,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, { required })}
        className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
      />
    </div>
  );
}
