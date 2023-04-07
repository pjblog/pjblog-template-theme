import Componet from './index';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
  document.getElementById('pjblog'),
  <Componet {...window.INIT_STATE} />
);