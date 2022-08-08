import Axios from "axios"

interface params {
    method: string,
    url: string,
    param: string
}
export const request = (props: params): any => {
    if (props.method === "POST") {
        return Axios.post(props.url, props.param)
            .then((result) => {
                return result.data
            })
            .catch((err) => {
                return err
            })
    }

    if (props.method === "GET") {
        return Axios.get(props.url)
            .then((result) => {
                return result.data
            })
            .catch((err) => {
                return err
            })
    }

}