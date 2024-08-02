import { History } from "./components/History/History";
import { MainLayout } from "./components/Layouts/MainLayout/MainLayout";
import "swiper/css";
import { Calendar } from "./components/Calendar/Calendar";

function App() {
  return (
    <MainLayout>
      <History />
      <Calendar />
    </MainLayout>
  );
}

export default App;
