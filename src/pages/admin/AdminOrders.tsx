import { useEffect, useState } from "react";
// components
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import OrderForm from "@/components/admin/OrderForm";
import Loading from "@/components/Loading";
// utils
import { confirmAlert, sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
import ZipCodeMap from "@/utils/zipcodes";
// interface
import { OrdersList, RoomsList, UserInfo } from "@/interface/admin";
// ant design
import { Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
// api data
import { AxiosError } from "axios";
import { deleteOrder, readAllOrders } from "@/api/admin";

export default function AdminOrders() {
  // antd table th
  const columns: ColumnsType<OrdersList> = [
    {
      title: "訂單編號",
      dataIndex: "_id",
      key: "_id",
      width: 200,
    },
    {
      title: "預訂房型",
      dataIndex: "roomId",
      key: "roomId",
      width: 200,
      render: (roomId: RoomsList) => <>{roomId.name}</>,
    },
    {
      title: "預訂人數",
      dataIndex: "peopleNum",
      key: "peopleNum",
      width: 200,
    },
    {
      title: "預訂日期",
      key: "dateRange",
      width: 300,
      render: (record) => {
        const checkInDate = new Date(record.checkInDate);
        const checkOutDate = new Date(record.checkOutDate);
        // 沒有加入斷言會發生錯誤
        const options = {
          year: "numeric" as const,
          month: "2-digit" as const,
          day: "2-digit" as const,
        };

        const formateCheckInDate = checkInDate.toLocaleDateString(
          "zh-TW",
          options
        );
        const formateCheckOutDate = checkOutDate.toLocaleDateString(
          "zh-TW",
          options
        );

        return (
          <span>
            {formateCheckInDate} - {formateCheckOutDate}
          </span>
        );
      },
    },
    {
      title: "預訂者資訊",
      dataIndex: "userInfo",
      key: "userInfo",
      width: 300,
      render: (userInfo: UserInfo) => {
        const city = ZipCodeMap.find(
          (item) => item.zipcode === Number(userInfo?.address?.zipcode)
        )?.city;
        const county = ZipCodeMap.find(
          (item) => item.zipcode === Number(userInfo?.address?.zipcode)
        )?.county;

        return (
          <>
            <p>{userInfo.name}</p>
            <p>{userInfo.phone}</p>
            <p>{userInfo.email}</p>
            <p>{`${userInfo.address.zipcode} ${city}${county}${userInfo.address.detail}`}</p>
          </>
        );
      },
    },
    {
      title: "預訂狀態",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (status: number, record) => {
        const checkOutDate = new Date(record.checkOutDate);

        return (
          <>
            {checkOutDate < new Date() ? (
              <Tag> {status !== -1 ? "已完成" : "已過期"}</Tag>
            ) : (
              <Tag color={status !== -1 ? "green" : "red"}>
                {status !== -1 ? "預訂中" : "取消預訂"}
              </Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      width: 110,
      render: (_, editOrderData) => (
        <Space size="middle">
          {/* <a onClick={() => openModalFn("edit", editOrderData)}>編輯</a> */}
          <a onClick={() => deleteOrderDataFn(editOrderData)}>刪除</a>
        </Space>
      ),
    },
  ];

  // 取得全部訂單
  const [allOrdersData, setAllOrdersData] = useState<OrdersList[]>([]);
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    // 新增或更新會重新刷新取值
    const fetchOrdersData = async () => {
      try {
        const { data } = await readAllOrders();
        setAllOrdersData(data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchData(false);
      }
    };

    if (fetchData) {
      fetchOrdersData();
    }
  }, [fetchData]);

  // 傳入要編輯的資料
  const [editOrderData, setOrderData] = useState<OrdersList | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 打開 Modal
  const openModalFn = (txt: string, editOrderData: OrdersList) => {
    setIsModalOpen(true);

    if (txt === "new") {
      setOrderData(null);
    } else if (txt === "edit") {
      setOrderData(editOrderData);
    }
  };

  // 關閉 Modal
  const closeModalFn = () => {
    setIsModalOpen(false);
  };

  // 取消訂單
  const deleteOrderDataFn = async (editOrderData: OrdersList) => {
    try {
      const result = await confirmAlert("warning", "確定要取消訂單？");
      if (result.isConfirmed && editOrderData?._id) {
        try {
          await deleteOrder(editOrderData?._id);
          sweetAlert("success", "取消成功");
          // 讓資料重新渲染
          setTimeout(() => {
            setFetchData(true);
          }, 1000);
        } catch (error: unknown) {
          sweetAlertError(error as AxiosError, "取消失敗");
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
              <h1 className="text-h3 font-bold tracking-wider">訂單管理</h1>
              <Tag className="bg-transparent text-black-80 border-black-60 mt-1">
                {allOrdersData.length}
              </Tag>
            </div>
          </div>
          <Table<OrdersList>
            scroll={{ x: 1500 }}
            columns={columns}
            dataSource={allOrdersData.map((item) => ({
              ...item,
              key: item._id,
            }))}
          />

          <Modal
            title="編輯訂單"
            centered
            open={isModalOpen}
            onCancel={closeModalFn}
            footer={null}
          >
            <OrderForm
              text="編輯訂單"
              editData={editOrderData}
              closeModalFn={closeModalFn}
              setFetchData={setFetchData}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
