import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import API from 'services/imagesAPI';
import { Layout } from 'components/Layout';
import { GlobalStyle } from 'components/GlobalStyle';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Spinner/Loader';

class App extends Component {
  state = {
    status: 'idle',
    query: '',
    images: [],
    activeImage: null,
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (!query) return;

    if (page !== prevState.page || query !== prevState.query) {
      this.getApiImages();
    }
  }

  async getApiImages() {
    const { query, page, images } = this.state;

    this.setStatus('pending');

    try {
      const { hits, totalHits } = await API.searchImages(query, page);

      if (!hits.length) {
        toast.error(`No images by query ${this.state.query}`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }

      this.setState({
        images: [...images, ...hits],
      });

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} image(s).`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setStatus('resolved');
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  setNewQuery = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalPages: 1,
      status: 'idle',
    });
  };

  activeImageUrl = url => this.setState({ activeImage: url });

  loadMoreBtn = () => this.setState(({ page }) => ({ page: page + 1 }));

  setStatus = status => this.setState({ status });

  render() {
    const { status, images, activeImage, page, totalPages } = this.state;

    const isVisibleButton = page < totalPages && status === 'resolved';

    return (
      <Layout>
        <Searchbar onSearch={this.setNewQuery} />

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.activeImageUrl} />
        )}

        {activeImage && (
          <Modal
            url={activeImage}
            onClose={() => this.activeImageUrl(null)}
          />
        )}

        {isVisibleButton && (
          <Button onClick={this.loadMoreBtn}>Load More</Button>
        )}

        {status === 'pending' && <Loader />}

        <Toaster autoClose={3000} />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
