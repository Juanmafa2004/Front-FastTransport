import { Login } from "./Components/Login";
import HomeViewmodel from "./Home.viewmodel";

const Home = () => {
  const { formData, errors, handleValueChange, handleSubmit } = HomeViewmodel();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Login
        formData={formData}
        errors={errors}
        handleValueChange={handleValueChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
