import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getImages } from "./Components/api-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "./Components/Container";
import Placeholder from "./Components/Placeholder";
import SearchBar from "./Components/SearchBar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";

const STATUS = {
  IDLE: "idle",
  REJECTED: "rejected",
  RESOLVED: "resolved",
};

function App() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [topic, setTopic] = useState("");
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (topic === "") {
      return;
    }

    if (page === 1) {
      setImages([]);
    }

    setLoader(true);

    getImages(page, topic)
      .then((data) => {
        if (data.hits.length < 12) {
          toast.warn("No more images to load", {
            toastId: "anotherCustomId",
          });
        }

        setImages((prev) => [...prev, ...data.hits]);
        setStatus(STATUS.RESOLVED);
      })
      .catch(() => setStatus(STATUS.REJECTED))
      .finally(() => {
        setLoader(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [page, topic]);

  const checkTopic = (val) => {
    if (topic === val.toLowerCase()) {
      toast.dark("The same request! Try something another :)", {
        toastId: "customId",
      });
      return;
    }

    setTopic(val.toLowerCase());
    setPage(1);
  };

  const onImgClick = (id) => {
    const modalImg = images.find((img) => img.id === id);
    setModalContent(modalImg);
    setModal((prev) => !prev);
  };

  return (
    <Container>
      <SearchBar setTopic={checkTopic} />

      {status === "idle" ? (
        <Placeholder text="Use the search bar above if you are looking to get an awesome wallpaper" />
      ) : null}
      {status === "resolved" ? (
        <>
          <ImageGallery images={images} onImgClick={onImgClick} />
          <Button onClick={() => setPage((prev) => prev + 1)} />
        </>
      ) : null}
      {loader && (
        <Loader
          className="Loader"
          type="Grid"
          color="#9900cc"
          height={180}
          width={180}
        />
      )}
      {status === "rejected" ? (
        <Placeholder text="Some error occured while fetching requested images" />
      ) : null}
      {showModal && (
        <Modal showModal={() => setModal((prev) => !prev)}>
          <img src={modalContent.largeImageURL} alt={modalContent.tags} />
        </Modal>
      )}
      <ToastContainer />
    </Container>
  );
}

export default App;
