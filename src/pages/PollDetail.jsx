// src/pages/PollDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPollById } from "../services/pollService";
import { getSolveById } from "../services/solveService"; // تأكد من صحة مسار الملف
import { FaTimes } from "react-icons/fa";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // الحالة الخاصة بعرض النافذة المنبثقة للمشاركين
  const [showParticipants, setShowParticipants] = useState(false);
  const [solveData, setSolveData] = useState(null);
  const [solveLoading, setSolveLoading] = useState(false);
  const [solveError, setSolveError] = useState(null);

  // جلب بيانات الاستطلاع
  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      try {
        const response = await getPollById(id);
        if (response.success) {
          setPoll(response.data);
        } else {
          setError("فشل جلب بيانات الاستطلاع");
        }
      } catch (err) {
        console.error("خطأ عند جلب الاستطلاع:", err);
        setError("حدث خطأ أثناء جلب بيانات الاستطلاع");
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  // دالة لجلب بيانات المشاركين عند فتح النافذة
  const fetchParticipants = async () => {
    setSolveLoading(true);
    try {
      const response = await getSolveById(id);
      if (response.success) {
        setSolveData(response.data);
      } else {
        setSolveError("فشل جلب بيانات الإجابات");
      }
    } catch (err) {
      console.error("خطأ عند جلب بيانات الإجابات:", err);
      setSolveError("حدث خطأ أثناء جلب بيانات الإجابات");
    } finally {
      setSolveLoading(false);
    }
  };

  const handleShowParticipants = () => {
    setShowParticipants(true);
    fetchParticipants();
  };

  const closeModal = () => {
    setShowParticipants(false);
    setSolveData(null);
    setSolveError(null);
  };

  if (loading) return <div className="p-6 text-center">جار التحميل...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!poll) return null;

  return (
    <div className="p-6" style={{ direction: "rtl" }}>
      <h2 className="text-3xl font-bold mb-4">{poll.title}</h2>
      <p className="mb-6">{poll.description}</p>

      <h3 className="text-2xl font-semibold mb-3">الأسئلة</h3>
      {poll.questions && poll.questions.length > 0 ? (
        <ul className="space-y-4">
          {poll.questions.map((question) => (
            <li key={question.id} className="border p-4 rounded-md">
              <p className="font-medium">{question.text}</p>
              <ul className="mt-2 space-y-1">
                {question.answers &&
                  question.answers.map((answer) => (
                    <li
                      key={answer.id}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <span className="text-sm">{answer.text}</span>
                      <span className="text-xs text-gray-500">
                        ({answer.points} نقطة)
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>لا توجد أسئلة.</p>
      )}

      <div className="mt-6">
        <button
          onClick={handleShowParticipants}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          عرض المشاركين
        </button>
      </div>

      {/* نافذة المشاركين */}
      {showParticipants && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white h-[70%] rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative overflow-scroll">
            <button
              onClick={closeModal}
              className="absolute top-3 left-3 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-semibold mb-4">تفاصيل الإجابات</h3>
            {solveLoading ? (
              <p>جار التحميل...</p>
            ) : solveError ? (
              <p className="text-red-600">{solveError}</p>
            ) : solveData ? (
              <div>
                <p className="mb-2">
                  <strong>إجمالي النقاط:</strong> {solveData.pollPoints}
                </p>
                <table className="w-full h-80 text-sm border-collapse overflow-scroll">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-2">اسم المستخدم</th>
                      <th className="py-2 px-2">الإيميل</th>
                      <th className="py-2 px-2">السؤال</th>
                      <th className="py-2 px-2">النقاط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solveData.answers.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 px-2">{item.user.name || "—"}</td>
                        <td className="py-2 px-2">{item.user.email || "—"}</td>
                        <td className="py-2 px-2">
                          {item.answer.Question.text}
                        </td>
                        <td className="py-2 px-2">{item.answer.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>لا توجد بيانات.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
