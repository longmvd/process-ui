const getStatus = (status) => {
    try {
        let resultStatus = {
            text:"",
            class: '',
            iconClass:''
        }
        switch (status) {
            case 1:
                resultStatus.text = "Chưa kích hoạt"
                resultStatus.class = 'color-blue'
                resultStatus.iconClass = 'bg-blue'
                break;
            case 2:
                resultStatus.text = "Chờ xác nhận"
                resultStatus.class = 'color-orange'
                resultStatus.iconClass = 'bg-orange'
                break;
            case 3:
                resultStatus.text = "Đang hoạt động"
                resultStatus.class = 'color-green'
                resultStatus.iconClass = 'bg-green'
                break;
            case 4:
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

export {getStatus}