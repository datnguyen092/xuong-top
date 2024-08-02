/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import { Link } from "react-router-dom";

const ProductPage = () => {
    const categoryMap: { [key: string]: string } = {
        "669a8f1daee5ff54f06c4507": "Danh mục 1",
        "669a8f7faee5ff54f06c4512": "Danh mục 2",
        "3": "Danh mục 3",
        // Thêm các danh mục khác tại đây
    };
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                return await instance.get(`/products`);
            } catch (error) {
                throw new Error("Call API thất bại");
            }
        },
    });
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`/products/${id}`);
            } catch (error) {
                throw new Error("Xóa sản phẩm thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Sản phẩm đã được xóa thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (error) => {
            messageApi.open({
                type: "success",
                content: error.message,
            });
        },
    });
    const createFilters = (products: IProduct[]) => {
        return products
            .map((product: IProduct) => product.name)
            .filter(
                (value: string, index: number, self: string[]) =>
                    self.indexOf(value) === index,
            )
            .map((name: string) => ({ text: name, value: name }));
    };
    console.log(data?.data?.data);
    const dataSource = data?.data?.data.map((product: IProduct) => ({
        key: product._id,
        ...product,
    }));

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            filterSearch: true,
            filters: data ? createFilters(data?.data?.data) : [],
            onFilter: (value: string, product: IProduct) =>
                product.name.includes(value),
            sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "price",
            key: "price",
            sorter: (a: IProduct, b: IProduct) => a.price - b.price,
            render: (price: number) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                })
                    .format(price)
                    .replace("₫", "VND"),
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            sorter: (a: IProduct, b: IProduct) =>
                (categoryMap[a.category] || "").localeCompare(
                    categoryMap[b.category] || "",
                ),
            render: (categoryId: string) =>
                categoryMap[categoryId] || "Chưa xác định",
            // Có thể thêm filter nếu cần
            // filters: createCategoryFilters(data?.data?.data),
            // onFilter: (value: string, product: IProduct) => product.category.includes(value),
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "discount",
            key: "discount",
            sorter: (a: IProduct, b: IProduct) => a.discount - b.discount,
            render: (discount: number) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                })
                    .format(discount)
                    .replace("₫", "VND"),
        },
        {
            title: "Số lượng sản phẩm",
            dataIndex: "countInStock",
            key: "countInStock",
            sorter: (a: IProduct, b: IProduct) =>
                a.countInStock - b.countInStock,
            render: (countInStock: number) =>
                countInStock.toLocaleString("vi-VN"),
        },
        {
            title: "Sản phẩm nổi bật",
            dataIndex: "featured",
            key: "featured",
            filters: [
                { text: "Nổi bật", value: true },
                { text: "Không nổi bật", value: false },
            ],
            onFilter: (value: boolean, product: IProduct) =>
                product.featured === value,
            render: (featured: boolean) =>
                featured ? "Nổi bật" : "Không nổi bật",
        },
        {
            key: "action",
            width: 200,
            render: (_: any, product: IProduct) => {
                return (
                    <div className="flex space-x-3">
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc chắn muốn xóa không?"
                            onConfirm={() => mutate(product._id!)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger>
                                Delete
                            </Button>
                        </Popconfirm>
                        <Button type="primary">
                            <Link to={`/admin/products/${product._id}/edit`}>
                                Cập nhật
                            </Link>
                        </Button>
                    </div>
                );
            },
        },
    ];
    if (isError) return <div>{error.message}</div>;
    return (
        <div>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
                <Button type="primary">
                    <Link to={`/admin/products/add`}>
                        <PlusCircleFilled /> Thêm sản phẩm
                    </Link>
                </Button>
            </div>
            <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns} />
            </Skeleton>
        </div>
    );
};

export default ProductPage;
