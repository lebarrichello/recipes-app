import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [productsList, setProductsList] = useState([]);

  const values = useMemo({
    productsList,
    setProductsList,
  }, []);

  return (
    <AppContext.Provider value={ values }>
      <div>
        { children }
      </div>
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
