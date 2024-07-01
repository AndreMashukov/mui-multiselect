import PreferenceModalContainer from "./PreferenceModalContainer/PreferenceModalContainer";
import { PreferenceModalContextProvider } from "./context/PreferenceModalContextProvider";

const PreferenceModal = ({ showModal, setShowModal }) => {
  return (
    <PreferenceModalContextProvider>
      <PreferenceModalContainer
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </PreferenceModalContextProvider>
  );
};

export default PreferenceModal;
