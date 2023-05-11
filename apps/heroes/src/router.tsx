import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createHashRouter } from 'react-router-dom';
import EditHero from './routes/EditHero';
import AddHero from './routes/AddHero';
import ListHero from './routes/ListHero';

const router = createHashRouter([
  {
    path: '/',
    element: <ListHero></ListHero>,
  },
  {
    path: '/heroes',
    element: <ListHero></ListHero>,
  },
  {
    path: '/heroes/add',
    element: <AddHero></AddHero>,
  },
  {
    path: '/heroes/edit/:heroId',
    element: <EditHero></EditHero>,
  },
]);

export { router };
