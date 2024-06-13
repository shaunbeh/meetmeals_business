import type { ReactElement } from 'react';

import Layout from './Layout';

const AppWrapper = ({ children }: { children: ReactElement }) => (
  <Layout>{children}</Layout>
);

export default AppWrapper;
