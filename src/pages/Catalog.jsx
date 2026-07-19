import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnectors";
import { categories } from "../services/api";
import { getCatalogPageData } from "../services/operations/pageAndComponentsData";
import { useSelector } from "react-redux";
import  Error  from "./Error";
export default function Catalog() {
      const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const response = await apiConnector(
        "GET",
        categories.COURSE_CATEGORIES_API,
      );
      //   console.log("response in catalog: ",response)
      const rData = response?.data?.data;
      //   console.log("rtable: ",rData)
      const category_id = rData.filter(
        (ct) =>
          ct.name.replace(/\s+/g, "-").toLowerCase() ===
          catalogName.toLowerCase(),
      )[0]._id;
      //    console.log("categoryid: ",category_id)
      console.log("catalogName: ", catalogName);
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      console.log("categoryId: ", categoryId);
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("res in catalog: ",res)
        setCatalogPageData(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    if(categoryId){
        getCategoryDetails();
    }
    
  }, [categoryId]);

   if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner">Loading...</div>
          </div>
        )
      }
    //   if (!loading && !catalogPageData.success) {
    //     return <Error />
    //   }

  return (
    <div className="text-white">
      <div>
        <p></p>
        <p></p>
        <p></p>
      </div>

      <div>
        {/* section 1 */}
        <div>
          <div>
            <p>Most Popular</p>
            <p>New</p>
          </div>
          {/* <CourseSlider/> */}
        </div>
        {/* section2 */}
        <div>
          <p>Top courses</p>
          <div>{/* <CourseSlider/> */}</div>
        </div>
        {/* section3 */}
        <div>
          <p>Frequently buy together</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

