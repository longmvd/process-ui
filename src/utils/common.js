import { Status, StatusCode } from "@/enums"

const getStatus = (status) => {
    try {
        let resultStatus = {
            text: "",
            class: '',
            iconClass: ''
        }
        switch (status) {
            case Status.NOT_ACTIVATED:
                resultStatus.text = "Chưa kích hoạt"
                resultStatus.class = 'color-blue'
                resultStatus.iconClass = 'bg-blue'
                break;
            case Status.PENDING:
                resultStatus.text = "Chờ xác nhận"
                resultStatus.class = 'color-orange'
                resultStatus.iconClass = 'bg-orange'
                break;
            case Status.ACTIVE:
                resultStatus.text = "Đang hoạt động"
                resultStatus.class = 'color-green'
                resultStatus.iconClass = 'bg-green'
                break;
            case Status.IN_ACTIVE:
                resultStatus.text = "Ngừng kích hoạt"
                resultStatus.class = 'color-unavailable'
                resultStatus.iconClass = 'bg-unavailable'
                break;
        }
        return resultStatus
    } catch (error) {
        console.log(error)
        return ""
    }
}

const handleStatus = (response, ok, created, badRequest) => {

    try {
        let status = response?.status
        let data = response?.data
        data
        switch (status) {
            case StatusCode.OK:
                ok();
                break;
            case StatusCode.CREATED:
                created();
                break;
            case StatusCode.BAD_REQUEST:
                badRequest();
                break;
            case StatusCode.NOT_FOUND:
                badRequest();
                break;
        }
    } catch (error) {
        console.log(error)
    }
}

export { getStatus, handleStatus }