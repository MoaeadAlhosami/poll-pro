import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getPollById, updatePoll } from "../services/pollService";

const UpdatePoll = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getPollById(id);
        if (response.success) {
          const pollData = response.data;
          form.setFieldsValue({
            title: pollData.title,
            description: pollData.description,
          });
        } else {
          message.error("فشل في جلب بيانات الاستطلاع");
        }
      } catch (error) {
        console.error("Error fetching poll data:", error);
        message.error("حدث خطأ أثناء جلب بيانات الاستطلاع");
      }
    };

    if (id) {
      fetchPoll();
    }
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const response = await updatePoll(id, values);
      if (response.success) {
        message.success("تم تحديث الاستطلاع بنجاح");
        navigate(-1);
      } else {
        message.error("فشل في تحديث الاستطلاع");
      }
    } catch (error) {
      console.error("Error updating poll:", error);
      message.error("حدث خطأ أثناء تحديث الاستطلاع");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" style={{ direction: "rtl" }}>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">تحديث الاستطلاع</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="اسم الاستطلاع"
            rules={[{ required: true, message: "يرجى إدخال اسم الاستطلاع" }]}
          >
            <Input placeholder="أدخل اسم الاستطلاع" className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="description"
            label="الوصف"
            rules={[{ required: true, message: "يرجى إدخال وصف الاستطلاع" }]}
          >
            <Input.TextArea
              placeholder="أدخل وصف الاستطلاع"
              rows={3}
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md"
            >
              تحديث الاستطلاع
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePoll;
