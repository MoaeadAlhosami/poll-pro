import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Button,
} from "antd";
import moment from "moment";

import { getPollById } from "../services/pollService";
import { solve } from "../services/solveService";

function MultiStepSurvey() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pollData, setPollData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [form] = Form.useForm();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    employment_status: "",
    teaching: "",
    date_of_birth: "",
    age: "",
    address: "",
    gender: "",
  });

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        setLoading(true);
        const response = await getPollById(id);
        setPollData(response.data);

        const initialAnswers = response.data.questions.map((q) => ({
          questionId: q.id,
          answerId: "",
        }));
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching poll:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPollData();
  }, [id]);

  const getProgress = () => {
    switch (currentStep) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  const goNext = async () => {
    if (currentStep === 1) {
      form
        .validateFields()
        .then((values) => {
          if (values.date_of_birth) {
            values.date_of_birth = values.date_of_birth.format("YYYY-MM-DD");
          }
          setUserInfo(values);
          setCurrentStep(2);
        })
        .catch((err) => {
          console.log("Validation Error:", err);
        });
    } else if (currentStep === 2) {
      const payload = {
        ...userInfo,
        solve: answers.map((a) => ({
          questionId: a.questionId,
          answerId: a.answerId,
        })),
      };
      try {
        const response = await solve(payload);
        if (response.success) {
          setCurrentStep(3);
        } else {
          alert("حدث خطأ أثناء إرسال الاستطلاع.");
        }
      } catch (error) {
        console.error("Error submitting survey:", error);
        alert("حدث خطأ أثناء إرسال الاستطلاع.");
      }
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers((prev) =>
      prev.map((ans) =>
        ans.questionId === questionId ? { ...ans, answerId } : ans
      )
    );
  };

  const handleFinishSurvey = () => {
    alert("تم إنهاء الاستطلاع بنجاح!");
  };

  const StepHeader = () => {
    return (
      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? "bg-[#0C6D71]" : "bg-gray-300"
            }`}
          >
            <img
              src="/icons/Form.svg"
              alt="Step 1 Icon"
              className={`w-5 h-5 ${
                currentStep >= 1 ? "filter brightness-0 invert" : ""
              }`}
            />
          </div>
          <span
            className={`mt-2 text-base ${
              currentStep >= 1 ? "text-[#0C6D71]" : "text-gray-500"
            }`}
          >
            المعلومات الخاصة بك
          </span>
        </div>

        <div className="w-12 h-[1px] bg-gray-300" />

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? "bg-[#0C6D71]" : "bg-gray-300"
            }`}
          >
            <img
              src="/icons/FAQ.svg"
              alt="Step 2 Icon"
              className={`w-5 h-5 ${
                currentStep >= 2 ? "filter brightness-0 invert" : ""
              }`}
            />
          </div>
          <span
            className={`mt-2 text-base ${
              currentStep >= 2 ? "text-[#0C6D71]" : "text-gray-500"
            }`}
          >
            الأسئلة
          </span>
        </div>

        <div className="w-12 h-[1px] bg-gray-300" />

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 3 ? "bg-[#0C6D71]" : "bg-gray-300"
            }`}
          >
            <img
              src="/icons/Task Completed.svg"
              alt="Step 3 Icon"
              className={`w-5 h-5 ${
                currentStep === 3 ? "filter brightness-0 invert" : ""
              }`}
            />
          </div>
          <span
            className={`mt-2 text-base ${
              currentStep === 3 ? "text-[#0C6D71]" : "text-gray-500"
            }`}
          >
            الموافقة
          </span>
        </div>
      </div>
    );
  };

  const StepOne = () => {
    return (
      <div className="px-4">
        <Form
          form={form}
          layout="horizontal"
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ direction: "rtl" }}
          initialValues={{
            ...userInfo,
            date_of_birth: userInfo.date_of_birth
              ? moment(userInfo.date_of_birth)
              : null,
          }}
        >
          <Form.Item
            label="الاسم"
            name="name"
            rules={[{ required: true, message: "الرجاء إدخال الاسم" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="البريد الإلكتروني"
            name="email"
            rules={[
              { required: true, message: "الرجاء إدخال البريد الإلكتروني" },
              { type: "email", message: "البريد الإلكتروني غير صالح" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="الحالة الوظيفية"
            name="employment_status"
            rules={[
              { required: true, message: "الرجاء اختيار الحالة الوظيفية" },
            ]}
          >
            <Radio.Group>
              <Radio value="طالب">طالب</Radio>
              <Radio value="موظف">موظف</Radio>
              <Radio value="صاحب عمل">صاحب عمل</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="تاريخ الولادة"
                name="date_of_birth"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="التعليم"
                name="teaching"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="العمر" name="age">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="عنوان السكن" name="address">
            <Input />
          </Form.Item>

          <Form.Item
            label="الجنس"
            name="gender"
            rules={[{ required: true, message: "الرجاء اختيار الجنس" }]}
          >
            <Radio.Group>
              <Radio value="أنثى">أنثى</Radio>
              <Radio value="ذكر">ذكر</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const StepTwo = () => {
    if (!pollData?.questions) return null;
    return (
      <div style={{ direction: "rtl" }} className="space-y-8">
        {pollData.questions.map((question) => {
          const userAnswer = answers.find((a) => a.questionId === question.id);
          return (
            <div key={question.id} className="border-b border-gray-200 pb-4">
              <p className="font-semibold mb-3">{question.text}</p>
              <div className="flex flex-wrap gap-4 md:gap-8">
                {question.answers.map((ans) => (
                  <label key={ans.id} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`q-${question.id}`}
                      value={ans.id}
                      checked={userAnswer?.answerId === ans.id}
                      onChange={() => handleAnswerChange(question.id, ans.id)}
                    />
                    <span>{ans.text}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const StepThree = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <img
        src="/images/Businessman relaxing with coffee after the work is done.png"
        alt="SurveyFinish"
        className="w-80 h-80 object-contain mx-auto"
      />
      <h2 className="text-2xl font-bold">تم الانتهاء</h2>
      <p className="text-gray-600">شكرًا لمشاركتك في هذا الاستطلاع.</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!pollData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>تعذر جلب الاستطلاع</p>
      </div>
    );
  }

  return (
    // نستخدم min-h-screen هنا ليكون المحتوى قابلاً للتمرير على الأجهزة الصغيرة
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* الشريط الجانبي */}
      <div
        className="w-full md:w-1/3 flex flex-col"
        style={{ backgroundColor: "#001b42" }}
      >
        {/* القسم العلوي: الصورة والنص */}
        <div className="relative">
          <img
            src="/images/Rectangle 1 copy (1).png"
            alt="Sidebar Background"
            className="w-full object-cover opacity-50"
          />
          <div
            className="absolute inset-0 flex flex-col justify-center items-center z-10 p-4"
            style={{ direction: "rtl" }}
          >
            <h1 className="text-3xl font-bold mb-2">
              {pollData.title || "عنوان الاستطلاع"}
            </h1>
            <p className="text-sm text-gray-200">
              {pollData.description || "شرح عن الاستطلاع"}
            </p>
          </div>
        </div>
        {/* القسم السفلي: معلومات الخطوة وشريط التقدم */}
        <div className="p-4 mt-auto" style={{ direction: "rtl" }}>
          <p className="text-sm text-gray-200 mb-2">
            الخطوة الحالية: {currentStep} من 3
          </p>
          <p className="text-sm text-gray-100 mb-1">
            {getProgress()}% تم استكماله
          </p>
          <div className="w-full bg-white h-2 rounded relative overflow-hidden">
            <div
              className="h-2 bg-gray-300 absolute top-0 left-0 right-0"
              style={{ width: "100%" }}
            />
            <div
              className="h-2 absolute top-0 left-0"
              style={{
                width: `${getProgress()}%`,
                backgroundColor: "#0c7478",
              }}
            />
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="w-full md:w-2/3 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <StepHeader />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-10">
            {currentStep === 1 && <StepOne />}
            {currentStep === 2 && <StepTwo />}
            {currentStep === 3 && <StepThree />}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-3">
          {currentStep > 1 && (
            <button
              onClick={goBack}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-base w-full md:w-auto"
            >
              رجوع
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={goNext}
              style={{ backgroundColor: "#0C6D71" }}
              className="px-6 w-full py-3 mx-3 text-white rounded hover:bg-blue-700 text-base md:w-auto"
            >
              التالي
            </button>
          )}
          {currentStep === 3 && (
            <button
              style={{ backgroundColor: "#0C6D71" }}
              onClick={handleFinishSurvey}
              className="px-6 py-3 w-full mx-3 text-white rounded hover:bg-green-700 text-base md:w-auto"
            >
              تم
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiStepSurvey;
