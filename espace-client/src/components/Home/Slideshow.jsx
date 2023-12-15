import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState , useEffect} from "react";
import styled from "styled-components";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 400px ;
  display: flex;
  overflow: hidden;
  background-color: #F3F3F3 ;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.6;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
height: 100%;
display:flex ;
z-index: 2;
`;

const Image = styled.img`
  height: 100%;
  width: 100% ;
`;



const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 1);
    } else {
      setSlideIndex(slideIndex < slideList.length -1? slideIndex + 1 : 0);
    }
  };


  
  const [slideList, setSlideList] = useState([]);

  useEffect(()=>{
        axios.get("http://localhost:1000/api/slide").then((response)=>{
          setSlideList(response.data.slide);

        });
  },[])

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {slideList.map((slide) => (
         <Link key={slide._id} to={slide.url}> <Slide>
            <ImgContainer>
              <Image src={slide.image} />
            </ImgContainer>
          </Slide></Link>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
