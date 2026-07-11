import { settingEndpoints } from "./api";
import { apiConnector } from "./apiconnectors";
import {toast} from "react-hot-toast"
import {setUser} from "../slices/profileSlice"
import { logOut } from "./operations/authApi";

const {
    UPDATE_PROFILE_API ,
     CHANGE_PASSWORD_API,
     DELETE_ACCOUNT_API
} = settingEndpoints

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("update profile api response: ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    } catch (err) {
      console.log("update profile api err: ", err.message)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("change password ai response: ", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (err) {
    console.log("change password api err: ", err.message)
    toast.error(err.response.data.message)
  }
  toast.dismiss(toastId)
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    console.log("delete api : ",DELETE_ACCOUNT_API)
    console.log("delete api user token : ",token)
    
    try {
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("delete account api res: ", response?.data?.message)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully" || response?.data?.message)
     await dispatch(logOut(navigate));
    } catch (err) {
      console.log("delete account api err: ", err.message)
      toast.error(err.response?.data?.message||err.message)
    }
    toast.dismiss(toastId)
  }
}