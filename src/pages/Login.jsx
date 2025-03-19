import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      alert("فشل تسجيل الدخول. تحقق من البيانات.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:flex-col md:justify-end w-1/3 bg-[#2F3A4A] relative p-6">
        <img
          src="/images/Rectangle 1 copy.png"
          alt="Login Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative flex flex-col justify-center items-center z-10 text-white mb-8">
          <h2 className="text-4xl mb-4 font-semibold">تسجيل الدخول</h2>
          <p className="text-sm mt-1">شرح بسيط</p>
        </div>
      </div>

      <div
        style={{ direction: "rtl" }}
        className="flex-1 bg-white flex items-center justify-center px-6 py-10"
      >
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">أهلاً بك</h1>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              اسم المستخدم أو الإيميل
            </label>
            <input
              type="text"
              placeholder="youremail@guru.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-teal-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:border-teal-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.784 0-8.865-3.11-10.39-7.439a.992.992 0 010-.562C3.135 6.67 7.216 3.56 12 3.56c4.784 0 8.865 3.11 10.39 7.439.09.287.09.59 0 .876-.676 1.884-1.866 3.543-3.41 4.728M9.88 14.12a3 3 0 104.24-4.24"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 15.172a4 4 0 01-5.656-5.656M2.458 12C3.732 7.943 7.45 5 12 5c4.55 0 8.268 2.943 9.542 7-1.274 4.057-4.992 7-9.542 7-4.55 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-teal-600 hover:underline">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            تسجيل دخول
          </button>

          <div className="mt-5 text-sm text-gray-700">
            ليس لديك حساب؟{" "}
            <a href="#" className="text-teal-600 hover:underline">
              تواصل معنا
            </a>
          </div>

          <div className="mt-3 text-xs text-gray-400 flex items-center space-x-2 space-x-reverse">
            <a href="#" className="hover:underline">
              الدعم الفني
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              شروط الخصوصية
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
