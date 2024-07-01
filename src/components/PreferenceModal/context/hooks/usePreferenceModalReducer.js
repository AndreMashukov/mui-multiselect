import { useEffect } from "react";
import useBaseReducer from "../../../../hooks/useBaseReducer";

const PREFERENCE_SLICE_NAME = "preference";

export const usePrefernceModalReducer = () => {
  const PREFERENCE_SETTINGS = {
    version: "31b43e6d-f45c-4e02-b715-77df09621ddc",
    defaultCountry: null,
    defaultCompany: null,
    defaultLayout: "all-expanded",
  };

  const getSettingFromLocalStorage = () => {
    try {
      const storedSettings = JSON.parse(
        localStorage.getItem(PREFERENCE_SLICE_NAME)
      );
      if (
        !storedSettings ||
        storedSettings.version !== PREFERENCE_SETTINGS.version ||
        !storedSettings.version
      ) {
        const defaultData = {
          version: PREFERENCE_SETTINGS.version,
          selectedCountry: PREFERENCE_SETTINGS.defaultCountry,
          selectedCompany: PREFERENCE_SETTINGS.defaultCompany,
          selectedLayout: PREFERENCE_SETTINGS.defaultLayout,
        };
        localStorage.setItem(
          PREFERENCE_SLICE_NAME,
          JSON.stringify(defaultData)
        );
        return defaultData;
      }
      return storedSettings;
    } catch (err) {
      console.log(err);
      return {
        version: PREFERENCE_SETTINGS.version,
        selectedCountry: PREFERENCE_SETTINGS.defaultCountry,
        selectedCompany: PREFERENCE_SETTINGS.defaultCompany,
        selectedLayout: PREFERENCE_SETTINGS.defaultLayout,
      };
    }
  };

  const { state, actions } = useBaseReducer({
    initialState: getSettingFromLocalStorage(),
  });

  useEffect(() => {
    localStorage.setItem(PREFERENCE_SLICE_NAME, JSON.stringify(state));
  }, [state]);

  return { state, actions };
};
