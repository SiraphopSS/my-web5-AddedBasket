import React, { useState, useEffect } from "react";
import { GetComicById, GetReviewById } from "../../services/http";
import { List, Card, Rate, Avatar , Form} from "antd";
import { ReviewInterface } from "../../interfaces/lReview";

import { useParams } from "react-router-dom";

function ReviewProduct() {
  const [review, setReview] = useState<ReviewInterface | null>(null);
  const [review1, setReview1] = useState<ReviewInterface[]>([]);
  let { id } = useParams();
  const [form] = Form.useForm();
  const getReviewById = async () => {
    let res = await GetReviewById(Number(id));
    if (res) {
        setReview(res);
    
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        ComicID: res.number,
        Comment: res.Comment,
        RatingID: res.RatingID,
      });
    }
  };

  useEffect(() => {
    getReviewById();

  }, [id]);



  return (
    <>
      <div className="bg-base-200">
        <h1 className="text-center text-3xl font-bold">review</h1>
        {review && (
            <div className="w-96  h-30 bg-base-100 m-auto rounded-lg">

                <h1 className="my-1 mx-auto    capitalize text-3xl font-bold">
                <p className="text-center"><Rate disabled defaultValue={review.RatingID} /></p>
                  
                </h1>
                <div className="text-xl ml-4">
                {review.Comment}
                </div>
            </div>
        )}
 
       
                     
      </div>
    </>
  );
}
export default ReviewProduct;
