const Title = {
  APP_NAME: "Quy trình",
  RUN_PROCESS: "Chạy quy trình",
  USER: "Người dùng",
  ROLE: "Vai trò",
  GROUP: "Nhóm người dùng",
  CONNECT: "Kết nối",
  SEARCH: "Tìm kiếm",
  SEARCH_FILTER: "Tìm theo tên, email, mã",
  PAGE_TOTAL: "Tổng: ",
  FROM_TO: "Từ <0> đến <0> bản ghi",
  ADD: "Thêm mới"
};

const NavbarItem = [
  { id: 0, title: "Lượt chạy" },
  { id: 1, title: "Tài liệu quy trình" },
  { id: 2, title: "Thiết kế quy trình" },
  { id: 3, title: "Báo cáo" },
];

const SidebarItem = [
  {
    id: 0,
    itemClass: "sidebar__item sidebar-user",
    iconClass: "icon-24 svg-icon-process sidebar-icon icon-employee",
    nameClass: "",
    name: Title.USER,
  },
  {
    id: 1,
    itemClass: "sidebar__item sidebar-role",
    iconClass: "icon-24 svg-icon-process sidebar-icon icon-protect",
    nameClass: "",
    name: Title.ROLE,
  },
  {
    id: 2,
    itemClass: "sidebar__item sidebar-group",
    iconClass: "icon-24 svg-icon-process sidebar-icon icon-group",
    nameClass: "",
    name: Title.GROUP,
  },
  {
    id: 3,
    itemClass: "sidebar__item sidebar-connect",
    iconClass: "icon-24 svg-icon-process sidebar-icon icon-connect",
    nameClass: "",
    name: Title.CONNECT,
  },
];

export { Title, NavbarItem, SidebarItem };
