import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../features/hooks/useAuth";
import { useLoading } from "../features/hooks/useLoading";

function Login() {
  const { isRequestLoading, setLoading } = useLoading();
  const login = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^\S*$/, "Password must not contain whitespace")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    },
  });
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="text-red-500 text-xs ">{formik.errors.email}</p>
        ) : null}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-500 text-xs ">{formik.errors.password}</p>
        ) : null}
        <button
          disabled={isRequestLoading}
          type="submit"
          className="uppercase bg-slate-700 hover:opacity-95 disabled:opacity-80 p-3 text-white rounded-lg"
        >
          {isRequestLoading ? "Loading..." : "login"}
        </button>
        <p className="mt-5">
          {`Don't`} have an account?{" "}
          <NavLink to="/sign-up" className="mx-2 text-blue-700">
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
