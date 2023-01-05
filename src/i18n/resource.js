const Title = {
  APP_NAME: "Quy trình",
  RUN_PROCESS: "Chạy quy trình",
  SELECT_ROLE: "Chọn vai trò",
  SELECT_JOBPOSITION: "Tất cả vị trí",
  SELECT_DEPARTMENT: "Tất cả phòng ban",
  ALL: "Tất cả",
  USER: "Người dùng",
  ROLE: "Vai trò",
  GROUP: "Nhóm người dùng",
  CONNECT: "Kết nối",
  NO_DATA: "Không có dữ liệu",
  SEARCH: "Tìm kiếm",
  SEARCH_FILTER: "Tìm theo tên, email, mã",
  CUSTOM_COLUMN: "Tùy chỉnh cột",
  PAGE_TOTAL: "Tổng: ",
  FROM_TO: "Từ <0> đến <0> bản ghi",
  ADD: "Thêm mới",
  ADD_USER: "Thêm người dùng",
  EDIT_USER: "Sửa người dùng",
  APPLY: "Áp dụng",
  RESTORE_DEFAULT: "Lấy lại mặc định",
  CANCEL: "Hủy",
  SAVE: "Lưu",
  DELETE: "Xóa",
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
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-employee",
    nameClass: "",
    name: Title.USER,
  },
  {
    id: 1,
    itemClass: "sidebar__item sidebar-role",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-protect",
    nameClass: "",
    name: Title.ROLE,
  },
  {
    id: 2,
    itemClass: "sidebar__item sidebar-group",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-group",
    nameClass: "",
    name: Title.GROUP,
  },
  {
    id: 3,
    itemClass: "sidebar__item sidebar-connect",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-connect",
    nameClass: "",
    name: Title.CONNECT,
  },
];

const UserColumn = [
  {
    id: 0,
    width: 200,
    minWidth: 100,
    field: "UserID",
    caption: "ID",
    text: "ID",
    cellTemplate: "title-tooltip",
    visible: false,
  },
  {
    id: 1,
    width: 200,
    minWidth: 100,
    field: "UserCode",
    caption: "Mã nhân viên",
    text: "Mã nhân viên",
    cellTemplate: "title-tooltip",
    visible: true,
  },
  {
    id: 2,
    width: 200,
    minWidth: 100,
    field: "UserName",
    caption: "Họ và tên",
    text: "Họ và tên",
    cellTemplate: "avatar-cell",
  },
  {
    id: 3,
    width: 200,
    minWidth: 100,
    field: "DepartmentName",
    caption: "Phòng ban",
    text: "Phòng ban",
    cellTemplate: "title-tooltip",
  },
  {
    id: 4,
    width: 200,
    minWidth: 100,
    field: "JobPositionName",
    caption: "Vị trí công việc",
    text: "Vị trí công việc",
    cellTemplate: "title-tooltip",
  },
  {
    id: 5,
    width: 200,
    minWidth: 100,
    field: "Email",
    caption: "Email",
    text: "Email",
    cellTemplate: "title-tooltip",
  },
  {
    id: 6,
    width: 200,
    minWidth: 100,
    field: "RoleNames",
    caption: "Vai trò",
    text: "Vai trò",
    cellTemplate: "title-tooltip",
  },
  {
    id: 7,
    width: 200,
    minWidth: 100,
    field: "Status",
    caption: "Trạng thái",
    dataType: "string",
    text: "Trạng thái",
    cellTemplate: "status-cell",
  },
]

const UserColumnAdd = [
  {
    id: 0,
    width: 100,
    field: null,
    caption: "STT",
    cellTemplate: "row-order",
    allowEditing: false,
    visible: false,

  },
  {
    id: 1,
    width: 150,
    field: "UserCode",
    caption: "Mã nhân viên",
    cellTemplate: null,
    visible: true,
  },
  {
    id: 2,
    width: 250,
    field: "UserName",
    caption: "Họ và tên",
    cellTemplate: undefined,
  },
  {
    id: 3,
    width: 200,
    field: "DepartmentName",
    caption: "Phòng ban",
    isSelection: true,
    cellTemplate: null,
  },
  {
    id: 4,
    width: 200,
    field: "JobPositionName",
    caption: "Vị trí công việc",
    cellTemplate: null,
  },
  {
    id: 5,
    width: 200,
    field: "Email",
    caption: "Email",
    cellTemplate: null,
  },
  {
    id: 6,
    width: 200,
    field: "Roles",
    caption: "Vai trò",
    isSelection: true,
    dataSource: [
      {
        RoleID: "dnifn-3432dsfs-dsfsf-dsffc1",
        RoleName: "Quản trị ứng dụng",
      },
      {
        RoleID: "dnifn-3432dsfs-dsfsf-dsffc2",
        RoleName: "Quản trị hệ thống",
      },
    ],
    displayExpr: 'RoleName',
    valueExpr: 'RoleID',
    cellTemplate: null,

  },

  {
    id: 6,
    width: 200,
    field: "Staus",
    caption: "Trạng thái",
    isSelection: true,
    cellTemplate: null,

  },

]

const Message = {
  REQUIRED: "Không để trống.",
  INVALID_EMAIL: "Email không đúng định dạng.",
  DUPLICATE_USER_CODE: "Mã trùng."
}

const UserStatus = [{ TEXT: "Chưa kích hoạt", VALUE: 1 }, { TEXT: "Chờ xác nhận", VALUE: 2 }, { TEXT: "Đang hoạt động", VALUE: 3 }, { TEXT: "Ngừng kích hoạt", VALUE: 4 }]

export { Title, NavbarItem, SidebarItem, UserColumn, UserColumnAdd, UserStatus, Message };


