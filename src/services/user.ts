import thisAxious from "../plugins/myAxious.ts";
import { setCurrentUserState } from "../states/user";


export const getCurrentUser = async () =>{



    const res = await thisAxious.get('/user/current');
    if (res.data.code === 200){
        setCurrentUserState(res.data.data);
        return res.data.data;
    }
    return null;
}