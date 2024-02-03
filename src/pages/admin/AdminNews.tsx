import { useEffect, useState } from "react";
// components
import NewsAndFoodsForm from "@/components/admin/NewsAndFoodsForm";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import Loading from "@/components/Loading";
// interface
import { NewsAndFoodsList } from "@/interface/admin";
// utils
import { confirmAlert, sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// icon
import { MaterialSymbol } from "react-material-symbols";
// ant design
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Modal } from "antd";
// api data
import { AxiosError } from "axios";
import { deleteNews, readAllNews } from "@/api/admin";

export default function News() {
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
      title: "桌機圖片連結",
      dataIndex: "image",
      key: "image",
      width: 300,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      width: 110,
      render: (_, editNewsData) => (
        <Space size="middle">
          <a onClick={() => openModalFn("edit", editNewsData)}>編輯</a>
          <a onClick={() => deleteNewsDataFn(editNewsData)}>刪除</a>
        </Space>
      ),
    },
  ];

  // 取得最新消息
  const [allNewsData, setAllNewsData] = useState<NewsAndFoodsList[]>([]);
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    // 新增或更新會重新刷新取值
    const fetchNewsData = async () => {
      try {
        const { data } = await readAllNews();
        setAllNewsData(data.result);
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
  const [editNewsData, setEditNewsData] = useState<NewsAndFoodsList | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 打開 Modal
  const openModalFn = (txt: string, editNewsData: NewsAndFoodsList) => {
    setIsModalOpen(true);

    if (txt === "new") {
      setEditNewsData(null);
    } else if (txt === "edit") {
      setEditNewsData(editNewsData);
    }
  };

  // 關閉 Modal
  const closeModalFn = () => {
    setIsModalOpen(false);
  };

  // 刪除最新消息
  const deleteNewsDataFn = async (editNewsData: NewsAndFoodsList) => {
    try {
      const result = await confirmAlert("warning", "確定要刪除？");
      if (result.isConfirmed && editNewsData?._id) {
        try {
          await deleteNews(editNewsData?._id);
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
              <h1 className="text-h3 font-bold tracking-wider">最新消息管理</h1>
              <Tag className="bg-transparent text-black-80 border-black-60 mt-1">
                {allNewsData.length}
              </Tag>
            </div>
            <button
              type="button"
              onClick={() => openModalFn("new", {} as NewsAndFoodsList)}
              className="inline-flex justify-center items-center text-primary-120 border border-primary-120 hover:bg-primary-40 font-semibold rounded px-8 py-2 text-sm transition-colors duration-300"
            >
              <MaterialSymbol icon="add" size={20} className="mr-1" />
              新增最新消息
            </button>
          </div>
          <Table<NewsAndFoodsList>
            scroll={{ x: 1500 }}
            columns={columns}
            dataSource={allNewsData.map((item) => ({ ...item, key: item._id }))}
          />

          <Modal
            title={`${editNewsData ? "編輯" : "新增"}最新消息`}
            centered
            open={isModalOpen}
            onCancel={closeModalFn}
            footer={null}
          >
            <NewsAndFoodsForm
              text="最新消息"
              editData={editNewsData}
              closeModalFn={closeModalFn}
              setFetchData={setFetchData}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
