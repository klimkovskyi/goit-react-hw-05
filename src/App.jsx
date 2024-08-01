import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImage } from "./services/api";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!query) return;
    const getImage = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchImage(query, page, 9);
        setImages(prev => [...prev, ...response.results]);
        setTotalPage(response.total_pages);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImage();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSetQuery = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = image => {
    setModalIsOpen(true);
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSetQuery} />
        <Toaster />
        <ImageGallery items={images} onImageClick={handleImageClick} />
        {error && <ErrorMessage />}
        {page < totalPage && !isLoading && images.length && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
        {isLoading && <Loader />}
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={handleCloseModal}
          image={selectedImage}
        />
      </div>
    </>
  );
}

export default App;
