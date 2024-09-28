export default function FormFieldError({ message = "" }) {
  return <p className="text-red-500">{message.toString()}</p>;
}
