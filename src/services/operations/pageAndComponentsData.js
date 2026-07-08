import { apiConnector } from "../apiconnectors";
import { catalogData } from "../api";

export const getCatalogPageData = async(categoryId)=>{
      const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOG_PAGE_DATA_API, 
        {categoryId: categoryId,});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(err) {
    console.log("catalog page data api err: ", err);
    toast.error(err.message);
    result = err.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}