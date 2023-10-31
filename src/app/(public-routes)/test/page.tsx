import {clientFetch} from "@/configs/axios/axios.config";

function Test() {

    clientFetch.get("api/users/2").then(res => console.log(res))

    return (
        "server"
    );
}

export default Test;
