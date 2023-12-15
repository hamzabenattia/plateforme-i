import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";
import ClearIcon from '@mui/icons-material/Clear';
import { listcategory } from "../../Redux/Actions/CategoryAction";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Select = styled.select`
  width: 20vh;
  height: 5vh;
  margin-left:10px ;

`;

const Input = styled.input`
  border-radius: 3px;
  margin: 5px;
  border: 1px solid gray;
  width: 40vh ;
display:flex;
   
`;

const P = styled.p`
  margin: 5px;
`;

const Div = styled.div`
  display: flex;
  align-items:center ;
  margin-bottom:3px ;
`;



const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productcategory, setproductcategory] = useState("");
  const [description, setDescription] = useState("");

  const [quantity, setquantity] = useState(0);

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    name: "",
    value: [],
  });

  const handleSpecsChange = (e) => {
    setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!specsInput.name.trim() || !specsInput.name.trim()) return;
      setSpecs([...specs, specsInput]);
    specsInput.value = highlights;

    setSpecsInput({ name: "", value: [""] });
    setHighlights([]);
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((s, i) => i !== index));
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };


  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const handleDataChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldImages) => [...oldImages, reader.result]);
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImagePreview = (index) => {
    setImagesPreview(imagesPreview.filter((h, i) => i !== index));
    setImages(images.filter((h, i) => i !== index));

  };


  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading:loadingcat , error:errorcat, categorys } = categoryList;


  useEffect(() => {
    dispatch(listcategory());

    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setSpecs([]);
      setPrice(0);
      setImages([]);
      setDescription("");
      setquantity(0);
      setImagesPreview([])
    }
  }, [product, dispatch]);

  const carac = specs;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        price,
        description,
        images,
        productcategory,
        carac,
        quantity
      )
    );
  };


  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
            Aller aux produits
            </Link>
            <h2 className="content-title">Ajouter un produit</h2>
            <div>
              <button type="submit" className="btn btn-primary">
              Publier maintenant
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                    Titre du produit
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                    Prix
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                    Quantité minimale

                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={quantity}
                      onChange={(e) => setquantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    
                    <label htmlFor="product_category" className="form-label">
                    Catégorie:
                    </label>
                    <Select className="form-select d-inline-block"
                      onChange={(e) => setproductcategory(e.target.value)}
                    >
                      {loadingcat ? <>Loading</>:
                      <>
                      <option></option>
                      {categorys.cat?.map((cat, i) => (
                        <option key={i} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                      </>
}
                    </Select>
                    
                  </div>
                  <h2 className="font-medium">Caractéristiques</h2>

                  <div >
                    <Input
                      type="text"
                      value={specsInput.name}
                      onChange={handleSpecsChange}
                      name="name"
                      label="Name"
                      placeholder="Nom"
                      variant="outlined"
                      className="form-control"
                      size="small"
                    />
<Div>
                    <Input
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      type="text"
                      placeholder="Option"
                      className="form-control"

                    />
                 
                    <AddIcon color="success" style={{cursor: "pointer"}} onClick={() => addHighlight()}/>
                    </Div>
                  </div>

                  <div>
                  <table className="table">
                  <tbody>
                    {highlights.map((h, i) => (

                      <tr>
                        <td>
                        <P>{h}</P>
                        </td>
                        <Div className="float-end">
                        <ClearIcon style={{cursor: "pointer"}}   color="warning" onClick={() => deleteHighlight(i)}/>
                        </Div>
                      </tr>
                     
                    ))}
                    </tbody>
                    </table>
                  </div>

                  <button className="btn btn-m btn-primary w-100" type="button" onClick={() => addSpecs()}>
                  Ajouter un Caractéristiques
                  </button>

                  <div>
                  <table className="table">
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr>
                        <td>
                        <p>{spec.name}</p>
                        </td>
                        {spec.value.map((v, i) => (
                          <p>{v}</p>
                        ))}
                          <td className="text-end">          
                          <Div className="float-end ">
                          <i className="fas fa-trash-alt btn btn-sm text-danger" style={{cursor: "pointer", fontSize:"20px"}}   color="warning"  onClick={() => deleteSpec(i)}></i>
                        
                        </Div>
                  
                
                
             
            </td>
                      </tr>
                    ))}
                    </tbody>
                    </table>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <h2 className="font-medium">Images du produit</h2>
                  <div className="flex gap-2 overflow-x-auto h-32 border rounded p-1">
                    {imagesPreview.map((image, i) => (
                      <>
                      <img 
                        width="220px"
                        height="220px"
                        draggable="false"
                        src={image}
                        alt="Product"
                        key={i}
                        className="w-full m-2 h-full object-contain"
                      />

                      <div  onClick={() => deleteImagePreview(i)} className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-1">
                    
                         <i className="fas fa-trash-alt"></i>
                      </div>
                    
                      </>
                      
                    ))}
                  </div>
                  <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2">
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleDataChange}
                      className="hidden"
                    />
                    Choose Files
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
