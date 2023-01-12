const StatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_INTERNAL_ERROR: 500,
}

const State =
{
    /// Không làm gì
    NoAction: 0,
    //Thêm
    Add: 1,
    //xóa
    Delete: 2,
}

const ErrorCode = {
    //Gặp exception
    Exception: 1,

    /// Lỗi trùng mã
    Duplicated: 2,

    /// Lỗi đầu vào không hợp lệ
    InvalidData: 3,

    ///Lỗi không tìm thấy tài nguyên
    NotFound: 4,

    ///Lỗi thất bại
    Failed: 5,
}

const Status = {
    /// <summary>
    /// Chưa kích hoạt
    /// </summary>
    NotActivated: 1,

    /// <summary>
    /// Chờ xác nhận
    /// </summary>
    Pending: 2,

    /// <summary>
    /// Đang hoạt động
    /// </summary>
    Active: 3,

    /// <summary>
    /// Ngừng kích hoạt
    /// </summary>
    Inactive: 4,

}

const LimitLength = {
    EMAIL: 255,
    USER_CODE: 20,
    USER_NAME: 100,
}
export { StatusCode, State, ErrorCode, LimitLength, Status }