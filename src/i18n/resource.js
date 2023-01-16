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
  DELETE_QUESTION: "Bạn có chắc chắn muốn xóa <b>{0}</b> khỏi ứng dụng AMIS Quy trình không?",
  SEARCH: "Tìm kiếm",
  SEARCH_FILTER: "Tìm kiếm theo tên, email, mã",
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
  CLOSE: "Đóng",
  DUPLICATED_USER_CODE: "Mã trùng: ",
  DUPLICATED_EMAIL: "Email trùng: ",

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
    to: '/users',
    itemClass: "sidebar__item sidebar-user",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-employee",
    nameClass: "",
    name: Title.USER,
  },
  {
    id: 1,
    to: '/roles',
    itemClass: "sidebar__item sidebar-role",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-protect",
    nameClass: "",
    name: Title.ROLE,
  },
  {
    id: 2,
    to: '/groups',
    itemClass: "sidebar__item sidebar-group",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-group",
    nameClass: "",
    name: Title.GROUP,
  },
  {
    id: 3,
    to: '/connect',
    itemClass: "sidebar__item sidebar-connect",
    iconClass: "icon-24 svg-icon-process mgr-4 sidebar-icon icon-connect",
    nameClass: "",
    name: Title.CONNECT,
  },
];

const UserColumn = [

  {
    id: 1,
    width: 200,
    minWidth: 100,
    field: "UserCode",
    caption: "Mã nhân viên",
    text: "Mã nhân viên",
    cellTemplate: "title-tooltip",
    isVisible: true,
  },
  {
    id: 2,
    width: 200,
    minWidth: 200,
    field: "UserName",
    caption: "Họ và tên",
    text: "Họ và tên",
    cellTemplate: "avatar-cell",
    isVisible: true,

  },
  {
    id: 3,
    width: 200,
    minWidth: 110,
    field: "DepartmentName",
    caption: "Phòng ban",
    text: "Phòng ban",
    cellTemplate: "title-tooltip",
    isVisible: true,

  },
  {
    id: 4,
    width: 200,
    minWidth: 100,
    field: "JobPositionName",
    caption: "Vị trí công việc",
    text: "Vị trí công việc",
    cellTemplate: "title-tooltip",
    isVisible: true,

  },
  {
    id: 5,
    width: 200,
    minWidth: 100,
    field: "Email",
    caption: "Email",
    text: "Email",
    cellTemplate: "title-tooltip",
    isVisible: true,

  },
  {
    id: 6,
    width: 200,
    minWidth: 100,
    field: "RoleNames",
    caption: "Vai trò",
    text: "Vai trò",
    cellTemplate: "title-tooltip",
    isVisible: true,

  },
  {
    id: 7,
    width: 200,
    minWidth: 150,
    field: "Status",
    caption: "Trạng thái",
    dataType: "string",
    text: "Trạng thái",
    cellTemplate: "status-cell",
    isVisible: true,

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
    required: false,
  },
  {
    id: 1,
    width: 150,
    field: "UserCode",
    caption: "Mã nhân viên",
    cellTemplate: null,
    visible: true,
    required: true,
  },
  {
    id: 2,
    width: 250,
    field: "UserName",
    caption: "Họ và tên",
    cellTemplate: undefined,
    visible: true,
    required: true,
  },
  {
    id: 3,
    width: 200,
    field: "DepartmentName",
    caption: "Phòng ban",
    isSelection: true,
    cellTemplate: null,
    visible: true,
    required: true,
  },
  {
    id: 4,
    width: 200,
    field: "JobPositionName",
    caption: "Vị trí công việc",
    cellTemplate: null,
    visible: true,
    required: true,
  },
  {
    id: 5,
    width: 200,
    field: "Email",
    caption: "Email",
    cellTemplate: null,
    visible: true,
    required: true,
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
    visible: true,
    required: true,
  },

  {
    id: 6,
    width: 200,
    field: "Staus",
    caption: "Trạng thái",
    isSelection: true,
    cellTemplate: null,
    visible: true,
    required: true,
  },

]

const Message = {
  REQUIRED: "Không để trống.",
  MAX_LENGTH: "Không quá {0} ký tự.",
  INVALID_EMAIL: "Email không đúng định dạng.",
  DUPLICATE_USER_CODE: "Mã trùng.",
  DUPLICATE_EMAIL: "Email trùng.",
  ADD_SUCCESS: "Thêm mới {0} người dùng thành công.",
  ADD_FAILED: "Thêm mới thất bại.",
  DELETE_SUCCESS: "Xóa thành công.",
  DELETE_FAILED: "Xóa thất bại.",
  EDIT_SUCCESS: "Sửa thành công.",
  EDIT_FAILED: "Sửa thất bại.",
  DETAILS: "Chi tiết: ",
  SERVER_ERROR: "Có lỗi xảy ra, vui lòng liên hệ Misa.",
  COMING_SOON: "Tính năng đang phát triển.",
  DUPLICATED_VALUE: "Gía trị trùng.",
  TRY_AGAIN: "Vui lòng thử lại sau."

}

// [
//   {
//     "Relationship": "And",
//     "Column": "",
//     "Operator": "",
//     "Value": "",
//     "SubQuery": {
//       "Operator": "And",
//       "Detail": [
//         {
//           "Relationship": "Or",
//           "Column": "FirstName",
//           "Operator": "Like",
//           "Value": "%nvcuong1%",
//           "SubQuery": null
//         },
//         {
//           "Relationship": "Or",
//           "Column": "LastName",
//           "Operator": "Like",
//           "Value": "%nvcuong1%",
//           "SubQuery": null
//         }
//       ]
//     }
//   },
//   {
//     "Relationship": "And",
//     "Column": "JobPositionID",
//     "Operator": "=",
//     "Value": "12",
//     "SubQuery": null
//   }
// ]

// => Where 1=1 And (FirstName Like "%nvcuong1%"  or LastName Like "%nvcuong1") And JobPositionID = 12


const UserStatus = [{ TEXT: "Chưa kích hoạt", VALUE: 1 }, { TEXT: "Chờ xác nhận", VALUE: 2 }, { TEXT: "Đang hoạt động", VALUE: 3 }, { TEXT: "Ngừng kích hoạt", VALUE: 4 }]

export { Title, NavbarItem, SidebarItem, UserColumn, UserColumnAdd, UserStatus, Message };


