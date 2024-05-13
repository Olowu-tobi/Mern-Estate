import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegister } from "../features/hooks/useAuth";
import { toast } from "react-toastify";
import { useLoading } from "../features/hooks/useLoading";

function SignUp() {
  const { isRequestLoading, setLoading } = useLoading();
  const register = useRegister();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .matches(/^\S*$/, "Username must not contain whitespace"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^\S*$/, "Password must not contain whitespace")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = await register(values);
        setLoading(false);
        data.error ? toast.error(data.error.message) : navigate("/login");
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    },
  });
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="p-3 border rounded-lg"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
        />
        {formik.errors.username && formik.touched.username ? (
          <p className="text-red-500 text-xs ">{formik.errors.username}</p>
        ) : null}
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
          {isRequestLoading ? "Loading..." : "sign up"}
        </button>
        <p className="mt-5">
          Have an account?{" "}
          <NavLink to="/login" className="mx-2 text-blue-700">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
