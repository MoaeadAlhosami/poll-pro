import React from "react";
import { Form, Input, Button, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { createPoll } from "../services/pollService";

const CreatePoll = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values:", values);
    try {
      const response = await createPoll(values);
      if (response.success) {
        message.success("تم إنشاء الاستطلاع بنجاح");
        form.resetFields();
      } else {
        message.error("فشل في إنشاء الاستطلاع");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      message.error("حدث خطأ أثناء إنشاء الاستطلاع");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" style={{ direction: "rtl" }}>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          إنشاء استطلاع جديد
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ questions: [] }}
        >
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

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-100"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">
                        السؤال {index + 1}
                      </h3>
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        className="text-red-500"
                      />
                    </div>
                    <Form.Item
                      {...field}
                      name={[field.name, "text"]}
                      fieldKey={[field.fieldKey, "text"]}
                      label="نص السؤال"
                      rules={[
                        { required: true, message: "يرجى إدخال نص السؤال" },
                      ]}
                    >
                      <Input
                        placeholder="أدخل نص السؤال"
                        className="rounded-md"
                      />
                    </Form.Item>

                    <Form.List name={[field.name, "answers"]}>
                      {(
                        answerFields,
                        { add: addAnswer, remove: removeAnswer }
                      ) => (
                        <>
                          {answerFields.map((answerField, idx) => (
                            <div
                              key={answerField.key}
                              className="flex space-x-2 items-end mb-2"
                            >
                              <Form.Item
                                {...answerField}
                                name={[answerField.name, "text"]}
                                fieldKey={[answerField.fieldKey, "text"]}
                                label={idx === 0 ? "الإجابة" : ""}
                                rules={[
                                  {
                                    required: true,
                                    message: "يرجى إدخال نص الإجابة",
                                  },
                                ]}
                                className="flex-1"
                              >
                                <Input
                                  placeholder="نص الإجابة"
                                  className="rounded-md"
                                />
                              </Form.Item>
                              <Form.Item
                                {...answerField}
                                name={[answerField.name, "points"]}
                                fieldKey={[answerField.fieldKey, "points"]}
                                label={idx === 0 ? "النقاط" : ""}
                                rules={[
                                  {
                                    required: true,
                                    message: "يرجى إدخال النقاط",
                                  },
                                ]}
                                className="w-32"
                              >
                                <Input
                                  type="number"
                                  placeholder="النقاط"
                                  className="rounded-md"
                                />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => removeAnswer(answerField.name)}
                                className="text-red-500"
                              />
                            </div>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => addAnswer()}
                              block
                              icon={<PlusOutlined />}
                              className="rounded-md"
                            >
                              إضافة إجابة
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    className="rounded-md"
                  >
                    إضافة سؤال
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md"
            >
              إنشاء الاستطلاع
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePoll;
