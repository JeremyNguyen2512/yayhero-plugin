import {RouterProvider} from 'react-router-dom'; 
import { router } from "./router";

function App() {
  return <div className="wrap">
   <RouterProvider router={router} />
    </div>;
}

export default App;
