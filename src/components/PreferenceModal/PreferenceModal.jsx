import PreferenceModalContainer from "./PreferenceModalContainer/PreferenceModalContainer";
import { PreferenceModalContextProvider } from "./context/PreferenceModalContextProvider";
import PropTypes from "prop-types";

const PreferenceModal = ({
  showModal,
  setShowModal,
  isMobile,
  countries,
  companies,
}) => {
  return (
    <PreferenceModalContextProvider>
      <PreferenceModalContainer
        showModal={showModal}
        setShowModal={setShowModal}
        isMobile={isMobile}
        countries={countries}
        companies={companies}
      />
    </PreferenceModalContextProvider>
  );
};

export default PreferenceModal;

PreferenceModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  isMobile: PropTypes.bool,
  countries: PropTypes.array,
  companies: PropTypes.array,
};
