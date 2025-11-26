import { useEffect } from "react"
import { apiService } from "../../services/api.service"
import { BackendRoutes } from "../../constants"
import { useDispatch } from "react-redux"
import { presentToast, TOAST_TYPES } from "../../redux/features/ToastSlice"

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    apiService.get(BackendRoutes.USERS).then(res => {
      console.log("🚀 ~ Home ~ res:", res)
    }).catch(error => {
      dispatch(presentToast({ message: apiService.getErrorMessage(error as Error), type: TOAST_TYPES.ERROR }))
    })
  }, [dispatch])

  return (
    <div className="text-gray-300">
      Home Component
    </div>
  )
}

export default Home
