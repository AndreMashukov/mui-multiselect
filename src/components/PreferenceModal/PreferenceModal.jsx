import PreferenceModalContainer from "./PreferenceModalContainer/PreferenceModalContainer";
import { PreferenceModalContextProvider } from "./context/PreferenceModalContextProvider";

const PreferenceModal = ({ showModal, setShowModal, isMobile }) => {
  return (
    <PreferenceModalContextProvider>
      <PreferenceModalContainer
        showModal={showModal}
        setShowModal={setShowModal}
        isMobile={isMobile}
      />
    </PreferenceModalContextProvider>
  );
};

export default PreferenceModal;
