import { RootState } from '../../../redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProfileVerify=() => {
    const workerInfo = useSelector((state: RootState) => state.workerInfo);
// console.log('workerInfo',workerInfo);

return workerInfo.workerInfo!==null ? <Outlet/>:<Navigate to={'/worker/login'}/>

}

export default ProfileVerify