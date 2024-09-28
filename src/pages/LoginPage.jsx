import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setItemsIntoLocalStorage } from "../utils/helper";
import { sendNotification } from "../utils/notifications";
import { updateAuthUser } from "../store/features/authSlice";
import { _config, FORM_ERROR_MESSAGES, SERVER_URL } from "../constants";
import { useForm } from "react-hook-form";
import FormFieldError from "../components/shared/FormFieldError";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userDetail) => {
      const resp = await axios.post(`${SERVER_URL}/auth/login`, userDetail);
      return resp;
    },
    onSuccess: (resp) => {
      if (resp?.status === 200) {
        dispatch(updateAuthUser({}));
        setItemsIntoLocalStorage(_config.ID, resp?.data?.userId, false);
        setItemsIntoLocalStorage(
          _config.TOKEN,
          resp?.data?.access_token,
          false
        );
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      const errors = error?.response?.data?.errors;

      if (error?.response?.data?.code === "INVALID_CREDENTIALS") {
        sendNotification("warning", "Please check your credentials");
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
        <h2 className="mb-14">Sign in</h2>
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
          Don't have an account ?
          <Link to="/signup" className="ml-2 text-black">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}
