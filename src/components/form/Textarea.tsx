export default function Textarea({
  register,
  errors,
  id,
  labelText,
  labelColor,
  placeholder,
  rules,
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className={`block text-sm lg:text-base mb-2 ${
          errors[id] ? "text-red-500" : { labelColor }
        }`}
      >
        {labelText}
      </label>
      <textarea
        id={id}
        className={`w-full rounded-lg px-3 py-4 border ${
          errors[id]
            ? "error-form"
            : "placeholder-black-100/20 border-black-40 focus:border-primary-100 focus:ring focus:ring-primary-100 focus:outline-none"
        }`}
        rows={5}
        cols={30}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {errors[id] && (
        <p className="mt-2 text-sm text-red-500">{errors[id]?.message}</p>
      )}
    </div>
  );
}
