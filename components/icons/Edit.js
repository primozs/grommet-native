// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Image } from 'react-native';

const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAYAAAAayliMAAAABGdBTUEAALGPC/xhBQAAAX9JREFUaAXtmNFpAzEMhpOSRTJDKHSPvHSZvhSySEcoWagLhPS5pakUIhDC8ll3af0bZDCy7xzyfTr5Erxa4bQXQnnFwYmRMPzl1oeT0PDDSZTgh5GowcNLlOA/aQ+c1V6AlfDgnwj+EV2iBk/s1wYr0QIPK1GC5xo/Un8QahNhnoQHL5v0DVliCh5aogTPr8pn6h/UBV4i1JPw4PlVyW1LPSKxo/Un6iIr8UDX7t6m4OULWyUg4VsloOGnJN5pAVzZCLSNXjlJrUvsWvMW2s6nJKDhRWZPA8m2jkPAD7FhJdM2JrzNiDdv/ZHyPm+vZ+ZtRrx5Zl5lJstGJaM6zLJR6cmyUcmoDrNsVHqybFQyqsOhy4bN9P9uHvPRh5we8P1I+9eyETArMBQ8S1gBEYvELpkXwKUCXeFZYolAd/glAhDwcwVg4OcIQMFHBeDgSwJfdNHrP3TPbvo/OXRisNZmgSLz7vAsGQHWayHg5wrAwK/JYMMWwfYdXJ/LvQz8AkJFKLG59X8XAAAAAElFTkSuQmCC';

export default Edit = (props) => (
  <Image source={{uri: IMAGE, scale: 2}} style={{width: 24, height: 24}} />
);
