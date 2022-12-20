import { Bars } from 'react-loader-spinner';
import { LoaderContainer } from 'components/Spinner/Loader.styled';

function Loader() {
  return (
    <LoaderContainer>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderContainer>
  );
}

export default Loader;
