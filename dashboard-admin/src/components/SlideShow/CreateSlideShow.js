import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createslide, listslide } from "../../Redux/Actions/SlideShowAction";
import { SLIDESHOW_CREATE_RESET } from "../../Redux/Constants/SlideShowConstant";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateSlideShow = () => {
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const slideCreate = useSelector((state) => state.slideCreate);
  const { loading, error, slide } = slideCreate;


  const handleDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);

	}


  useEffect(() => {
    dispatch(listslide())
    if (slide) {
      toast.success("Category Added", ToastObjects);
      dispatch({ type: SLIDESHOW_CREATE_RESET });
      setUrl("");
      setImage("");
    }

  }, [slide, dispatch]);


  const submitHandler = (e) => {
    e.preventDefault();
      if (url==="")
      {
        toast.error("Offre URL is required", ToastObjects);

      }
      else if (image ==="")
      {
        toast.error("Image is required", ToastObjects);

      }
      else
    dispatch(createslide(image,url));
  };

  return (
    <div className="col-md-12 col-lg-4">
        <Toast/>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
        {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
          <label htmlFor="product_name" className="form-label">
          URL de l'offre
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Image</label>
          <input className="form-control" type="file" name="image" accept="image/*" required onChange={handleDataChange}/>
        </div>
        <div className="d-grid">
          <button className="btn btn-primary py-2">Créer une diapositive</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSlideShow;
