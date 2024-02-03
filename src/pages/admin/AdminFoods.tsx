import { useEffect, useState } from "react";
// components
import NewsAndFoodsForm from "@/components/admin/NewsAndFoodsForm";
import Loading from "@/components/Loading";
// interface
import { NewsAndFoodsList } from "@/interface/admin";
//utils
import { confirmAlert, sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// icon
import { MaterialSymbol } from "react-material-symbols";
// ant design
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Modal } from "antd";
// api data
import { AxiosError } from "axios";
import { deleteFood, readAllFoods } from "@/api/admin";
import Breadcrumbs from "@/components/admin/Breadcrumbs";

export default function AdminFoods() {
  // antd table th
  const columns: ColumnsType<NewsAndFoodsList> = [
    {
      title: "標題",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "內文",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "圖片連結",
      dataIndex: "image",
      key: "image",
      width: 300,
    },
    {
      title: "供應時間",
      dataIndex: "diningTime",
      key: "diningTime",
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      width: 110,
      render: (_, editFoodsData) => (
        <Space size="middle">
          <a onClick={() => openModalFn("edit", editFoodsData)}>編輯</a>
          <a onClick={() => deleteFoodsDataFn(editFoodsData)}>刪除</a>
        </Space>
      ),
    },
  ];

  // 取得美味佳餚
  const [allFoodsData, setAllFoodsData] = useState<NewsAndFoodsList[]>([]);
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    // 新增或更新會重新刷新取值
    const fetchNewsData = async () => {
      try {
        const { data } = await readAllFoods();
        setAllFoodsData(data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchData(false);
      }
    };

    if (fetchData) {
      fetchNewsData();
    }
  }, [fetchData]);

  // 傳入要編輯的資料
  const [editFoodsData, setEditFoodsData] = useState<NewsAndFoodsList | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 打開 Modal
  const openModalFn = (txt: string, editFoodsData: NewsAndFoodsList) => {
    setIsModalOpen(true);

    if (txt === "new") {
      setEditFoodsData(null);
    } else if (txt === "edit") {
      setEditFoodsData(editFoodsData);
    }
  };

  // 關閉 Modal
  const closeModalFn = () => {
    setIsModalOpen(false);
  };

  // 刪除最新消息
  const deleteFoodsDataFn = async (editFoodsData: NewsAndFoodsList) => {
    try {
      const result = await confirmAlert("warning", "確定要刪除？");
      if (result.isConfirmed && editFoodsData?._id) {
        try {
          await deleteFood(editFoodsData?._id);
          sweetAlert("success", "刪除成功");
          // 讓資料重新渲染
          setTimeout(() => {
            setFetchData(true);
          }, 1000);
        } catch (error: unknown) {
          sweetAlertError(error as AxiosError, "刪除失敗");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {fetchData ? (
        <div className="flex justify-center items-center w-full h-screen absolute left-0 top-0  lg:pl-64">
          <Loading />
        </div>
      ) : (
        <div className="p-10">
          <Breadcrumbs />
          <div className="flex justify-between items-center mt-2 mb-5 lg:mb-10">
            <div className="flex items-center gap-2">
              <h1 className="text-h3 font-bold tracking-wider">美味佳餚管理</h1>
              <Tag className="bg-transparent text-black-80 border-black-60 mt-1">
                {allFoodsData.length}
              </Tag>
            </div>
            <button
              type="button"
              onClick={() => openModalFn("new", {} as NewsAndFoodsList)}
              className="inline-flex justify-center items-center text-primary-120 border border-primary-120 hover:bg-primary-40 font-semibold rounded px-8 py-2 text-sm transition-colors duration-300"
            >
              <MaterialSymbol icon="add" size={24} className="mr-1" />
              新增美味佳餚
            </button>
          </div>
          <Table<NewsAndFoodsList>
            scroll={{ x: 1500 }}
            columns={columns}
            dataSource={allFoodsData.map((item) => ({
              ...item,
              key: item._id,
            }))}
          />

          <Modal
            title={`${editFoodsData ? "編輯" : "新增"}美味佳餚`}
            centered
            open={isModalOpen}
            onCancel={closeModalFn}
            footer={null}
          >
            <NewsAndFoodsForm
              text="美味佳餚"
              editData={editFoodsData}
              closeModalFn={closeModalFn}
              setFetchData={setFetchData}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
