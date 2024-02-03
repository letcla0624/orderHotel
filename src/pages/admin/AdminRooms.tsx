import { useEffect, useState } from "react";
// components
import RoomsForm from "@/components/admin/RoomsForm";
import Loading from "@/components/Loading";
// interface
import { Info, RoomsList } from "@/interface/admin";
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
import { deleteRoom, readAllRooms } from "@/api/admin";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import { toThousands } from "@/utils/toThousands";

export default function AdminRooms() {
  // antd table th
  const columns: ColumnsType<RoomsList> = [
    {
      title: "圖片連結",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 200,
      className: "bg-white",
      render: (value: string) => <img src={value}></img>,
    },
    {
      title: "房型",
      dataIndex: "name",
      key: "name",
      width: 140,
      className: "bg-white",
    },
    {
      title: "房型介紹",
      dataIndex: "description",
      key: "description",
      width: 400,
      className: "bg-white",
    },
    {
      title: "坪數",
      dataIndex: "areaInfo",
      key: "areaInfo",
      width: 100,
      className: "bg-white",
      render: (value: number) => <p>{`${value} 坪`}</p>,
    },
    {
      title: "床數",
      dataIndex: "bedInfo",
      key: "bedInfo",
      width: 100,
      className: "bg-white",
      render: (value: number) => <p>{`${value} 張大床`}</p>,
    },
    {
      title: "最多人數",
      dataIndex: "maxPeople",
      key: "maxPeople",
      width: 100,
      className: "bg-white",
      render: (value: number) => <p>{`${value} 人`}</p>,
    },
    {
      title: "價格",
      dataIndex: "price",
      key: "price",
      width: 120,
      className: "bg-white",
      render: (value: number) => <p>{`NT$ ${toThousands(value)}`}</p>,
    },
    {
      title: "房內設備",
      dataIndex: "facilityInfo",
      key: "facilityInfo",
      width: 300,
      className: "bg-white",
      render: (facilityInfo: Info[]) => (
        <>
          {facilityInfo.map((info, index) => (
            <Tag
              key={index}
              color={info.isProvide ? "green" : "red"}
              className="m-1"
            >
              {info.title}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "備品提供",
      dataIndex: "amenityInfo",
      key: "amenityInfo",
      width: 300,
      className: "bg-white",
      render: (amenityInfo: Info[]) => (
        <>
          {amenityInfo.map((info, index) => (
            <Tag
              key={index}
              color={info.isProvide ? "green" : "red"}
              className="m-1"
            >
              {info.title}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      width: 110,
      render: (_, editRoomData) => (
        <Space size="middle">
          <a onClick={() => openModalFn("edit", editRoomData)}>編輯</a>
          <a onClick={() => deleteRoomDataFn(editRoomData)}>刪除</a>
        </Space>
      ),
    },
  ];

  // 取得全部房型
  const [allRoomsData, setAllRoomsData] = useState<RoomsList[]>([]);
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    // 新增或更新會重新刷新取值
    const fetchRoomsData = async () => {
      try {
        const { data } = await readAllRooms();
        setAllRoomsData(data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchData(false);
      }
    };

    if (fetchData) {
      fetchRoomsData();
    }
  }, [fetchData]);

  // 傳入要編輯的資料
  const [editRoomData, setEditRoomData] = useState<RoomsList | null>(null);
  const [clickText, setClickText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 打開 Modal
  const openModalFn = (txt: string, editRoomData: RoomsList) => {
    setIsModalOpen(true);

    if (txt === "new") {
      setEditRoomData(null);
      setClickText(txt);
    } else if (txt === "edit") {
      setEditRoomData(editRoomData);
      setClickText(txt);
    }
  };

  // 關閉 Modal
  const closeModalFn = () => {
    setIsModalOpen(false);
  };

  // 刪除房型
  const deleteRoomDataFn = async (editRoomData: RoomsList) => {
    try {
      const result = await confirmAlert("warning", "確定要刪除？");
      if (result.isConfirmed && editRoomData?._id) {
        try {
          await deleteRoom(editRoomData?._id);
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
              <h1 className="text-h3 font-bold tracking-wider">房型管理</h1>
              <Tag className="bg-transparent text-black-80 border-black-60 mt-1">
                {allRoomsData.length}
              </Tag>
            </div>
            <button
              type="button"
              onClick={() => openModalFn("new", {} as RoomsList)}
              className="inline-flex justify-center items-center text-primary-120 border border-primary-120 hover:bg-primary-40 font-semibold rounded px-8 py-2 text-sm transition-colors duration-300"
            >
              <MaterialSymbol icon="add" size={20} className="mr-1" />
              新增房型
            </button>
          </div>
          <Table<RoomsList>
            scroll={{ x: 1500 }}
            columns={columns}
            dataSource={allRoomsData.map((item) => ({
              ...item,
              key: item._id,
            }))}
          />

          <Modal
            title={`${editRoomData ? "編輯" : "新增"}房型`}
            centered
            open={isModalOpen}
            onCancel={closeModalFn}
            footer={null}
            width={960}
          >
            <RoomsForm
              text={clickText}
              editData={editRoomData}
              closeModalFn={closeModalFn}
              setFetchData={setFetchData}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
