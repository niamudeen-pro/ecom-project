import { Link, useNavigate } from "react-router-dom";
import { sendNotification } from "../utils/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FORM_ERROR_MESSAGES, SERVER_URL } from "../constants";
import FormFieldError from "../components/shared/FormFieldError";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userDetail) => {
      const resp = await axios.post(`${SERVER_URL}/auth/register`, userDetail);
      return resp;
    },
    onSuccess: (resp) => {
      if (resp?.status === 201 || resp?.status === 200) {
        sendNotification("success", "Registration Successfull");
        navigate("/login");
      }
    },
    onError: (error) => {
      const errors = error?.response?.data?.errors;

      if (error?.response?.data?.code === "EMAIL_ALREADY_EXIST") {
        sendNotification("warning", "Email already exists");
      } else if (errors && errors.length > 0 && errors[0]?.msg) {
        sendNotification("error", errors[0]?.msg);
      } else if (error?.response?.data?.code === "ERROR") {
        sendNotification("warning", "Something went wrong. Please try again");
      }
    },
  });

  const onSubmit = (data) => {
    if (!data) return;
    mutate(data);
  };

  return (
    <section className="customContainer min-h-[80vh] flexCenter">
      <form
        className="max-w-[36rem] min-h-[40rem] mx-auto text-lg p-14 rounded-xl space-y-10 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-14">Signup</h2>
        <div className="space-y-4 text-xl">
          <label className="capitalize">Username</label>
          <input
            autoComplete="off"
            {...register("username", {
              required: {
                value: true,
                message: FORM_ERROR_MESSAGES.REQUIRED,
              },
            })}
            className="border p-3 rounded-lg w-full"
          />
          {errors.username && (
            <FormFieldError message={errors.username.message} />
          )}
        </div>
        <div className="space-y-4 text-xl">
          <label className="capitalize">Email</label>
          <input
            autoComplete="off"
            {...register("email", {
              required: {
                value: true,
                message: FORM_ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: FORM_ERROR_MESSAGES.EMAIL.INVALID,
              },
            })}
            className="border p-3 rounded-lg w-full"
          />
          {errors.email && <FormFieldError message={errors.email.message} />}
        </div>
        <div className="space-y-4 text-xl">
          <label className="capitalize">Phone</label>
          <input
            autoComplete="off"
            {...register("phone", {
              required: {
                value: true,
                message: FORM_ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: FORM_ERROR_MESSAGES.PHONE.INVALID,
              },
              minLength: {
                value: 10,
                message: FORM_ERROR_MESSAGES.PHONE.INVALID,
              },
              maxLength: {
                value: 10,
                message: FORM_ERROR_MESSAGES.PHONE.INVALID,
              },
            })}
            className="border p-3 rounded-lg w-full"
          />
          {errors.phone && <FormFieldError message={errors.phone.message} />}
        </div>
        <div className="space-y-4 text-xl">
          <label className="capitalize">Password</label>
          <input
            autoComplete="off"
            {...register("password", {
              required: {
                value: true,
                message: FORM_ERROR_MESSAGES.REQUIRED,
              },
              minLength: {
                value: 3,
                message: FORM_ERROR_MESSAGES.PASSWORD.MIN_LENGTH,
              },
            })}
            className="border p-3 rounded-lg w-full"
          />
          {errors.password && (
            <FormFieldError message={errors.password.message} />
          )}
        </div>
        <button type="submit" className="btn w-full" disabled={isPending}>
          {isPending ? "Loading..." : "Submit"}
        </button>

        <p className="text-center">
          Already have an account?
          <Link to="/login" className="ml-2 text-black">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
