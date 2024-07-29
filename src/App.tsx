import { History } from "./components/History/History";
import { Layout } from "./components/Layout/Layout";
import "swiper/css";
import { Calendar } from "./components/Calendar/Calendar";

function App() {
  return (
    <Layout>
      <History />
      <Calendar />
    </Layout>
  );
}

export default App;
