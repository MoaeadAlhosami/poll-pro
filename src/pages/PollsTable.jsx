import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAllPolls } from "../services/pollService";

const PollsTable = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        const response = await getAllPolls();
        if (response.success) {
          // نتوقع أن تكون البيانات في response.data على شكل مصفوفة
          setPolls(response.data);
        }
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const columns = [
    {
      title: "الاسم",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/survey/${record.id}`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "الوصف",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "عدد الأسئلة",
      dataIndex: "questions",
      key: "questions",
      render: (questions) => questions?.length || 0,
    },
  ];

  return (
    <div style={{ direction: "rtl" }} className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold">استطلاعات الرأي</h1>
          <p>يمكنك اختيار أحد هذه الاستطلاعات للمشاركة</p>
        </div>
        <Button
          onClick={() => {
            navigate(`/dashboard`);
          }}
          type="primary"
          className="rounded-xl"
        >
          الداشبورد
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-md my-20 p-4">
        <Table
          dataSource={polls}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default PollsTable;
